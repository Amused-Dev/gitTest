class PlmWork {
    constructor(
        wsId,
        responseLimit,
        tenant,
        userId,
        modifiedSince,
        GetPlmProjectsAPI,
        GetPlmProjectItemsAPI,
        PatchPlmProjectAPI,
        processItemResponse,        
    ) {
        this.wsId = wsId;
        this.responseLimit = responseLimit;
        this.tenant = tenant;
        this.userId = userId;
        this.modifiedSince = modifiedSince;
        this.GetPlmProjectsAPI = GetPlmProjectsAPI !== undefined ? GetPlmProjectsAPI : async function() {
            console.error('GetPlmProjectsAPI not passed');
        };
        this.GetPlmProjectItemsAPI = GetPlmProjectItemsAPI !== undefined ? GetPlmProjectItemsAPI : async function() {
            console.error('GetPlmProjectItemsAPI not passed');
        };
        this.PatchPlmProjectAPI = PatchPlmProjectAPI !== undefined ? PatchPlmProjectAPI : async function () {
            console.error("PatchPlmProjectAPI not passed.");
        }; 
        this.processItemResponse = processItemResponse !== undefined ? processItemResponse : async function () {
            console.error("processItemResponse not passed.");
        };        
                
        this.headers = {
            "x-tenant": tenant,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-user-id": userId,
            "If-Modified-Since": modifiedSince,
        };

        this.projects = [];
        this.i = 0;
        this.dmsId;
        this.sectionId;
        this.updatedSections = [];
    }

    async fetchProjects() {
        const opts = {
            workspaces_id: this.wsId,
            response_limit: this.responseLimit,
            headers: this.headers,
        };
        
        try {
            const projectsResponse = await this.GetPlmProjectsAPI(opts);
            return projectsResponse;
        } catch (error) {
            log.error(error);
            throw error;
        }
    }

    async getProjectsArray() {
        const projectsResponse = await this.fetchProjects();
        try {
            for (const item of projectsResponse.data.items) {
                const dmsId = parseInt(item.__self__.substring(item.__self__.lastIndexOf('/') + 1), 10);
                await this.fetchItem(dmsId);
                this.i++;
            }
        } catch (error) {
            log.error(error);
            throw error;
        }
    }

    async fetchItem(dmsId) {
        const opts = {
            workspaces_id: this.wsId,
            response_limit: "1",
            dms_id: dmsId,
            parameters: {dmsId},
            headers: this.headers,
        };

        try {
            //console.log('fetchItem-dmsId: ' + dmsId);
            const itemResponse = await this.GetPlmProjectItemsAPI(opts);
            await this.processItemResponse(itemResponse, dmsId);
        } catch (error) {
            log.error(error);
            throw error;
        }
    }

    async pushSection(dmsId, sectionId) {
        //console.log('pushSectionItem');
        this.updatedSections.push({
                link: `/api/v3/workspaces/${this.wsId}/items/${dmsId}/views/1/sections/${sectionId}`,
                fields: [],
            });
    }    

    async pushSectionItem(dmsId, sectionId, fieldId, value) {
        const section = this.updatedSections.find(section => section.link.includes(`/sections/${sectionId}`));

        if (section) {
            section.fields.push({
                __self__: `/api/v3/workspaces/${this.wsId}/items/${dmsId}/views/1/fields/${fieldId}`,
                urn: `urn:adsk.plm:tenant.workspace.item.view.field:${this.tenant}.${this.wsId}.${dmsId}.1.${fieldId}`,
                value,
            });
        } else {
            console.error(`Section with sectionId ${sectionId} not found`);
        }
        // console.log(this.updatedSections);
    }   

    async updatePlmSection(dmsId, sections){
    //https://help.autodesk.com/view/PLM/ENU/?guid=FLC_RestAPI_Advanced_Functionalities_Item_details_endpoints_items_partial_updates_html

        console.log('updatePlmSection-dmsId:' + String(dmsId));
        const patchOpts = {
            workspaces_id: this.wsId,
            items_id: dmsId,
            headers: {
            "x-tenant": this.tenant,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "x-user-id": this.userId,            
            },
            data: { sections },
        };
        
        await this.PatchPlmProjectAPI(patchOpts);
        
    }  

    async roundNumber(n, p) {
        const factor = Math.pow(10, p);
        return Math.round(n * factor) / factor;
    }     

    async retrieveProjectsArray() {
        await this.getProjectsArray();
        return this.projects;
    }
 
}

complete({PlmWork});
// Usage with default/none passed processItemResponse
//const PlmWork = new PlmWork();
//await PlmWork.execute();
