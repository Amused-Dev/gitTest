// appFunctions.ts
namespace ReqMainPage {
    
    export function loadReqMainPage() {
        App.to(DP_ReqMain, "fade");
    }

    export function mainListingPromises() {
        function apiCall2(): Promise<any> {
            return new Promise((resolve) => {
                //console.log("API Call 2 completed");
                resolve("Result from API Call 2");
            });
        }

        Promise.all([apiUserDataLIST(), apiCall2()])
            .then((promiseResults) => {
                return apiReqHdrGET();
            })
            .then((apiReqHdrResult) => {
                modelTable_ReqMain.setData(modelM_ReqHdr.getData());
                Table_ReqMain.setBusy(false);
                //console.log("All API calls completed:", JSON.stringify(apiReqHdrResult));
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
    }
}

namespace ReqRcdPage {
    export function loadRcdPage() {
        App.to(DP_Rcd, "fade");
    }

    //Request Header Edit Panel
    export function loadPanel_ReqHdrEdt(dataContext: any) {
        console.log("loadPanel_ReqHdrEdt");
        setDP_RcdPageLayout();
        let dataObj = dataContext.getObject();
        modelSimpleForm_ReqHdrEdt.setData(dataObj);
        //debugger;
        FlexibleColumnLayout_Rcd.setLayout(sap.f.LayoutType.OneColumn); //TwoColumnsMidExpanded
        PageLft_Rcd.removeAllContent();
        Panel_ReqHdrEdt.setHeaderText(`Master Data Request: ${dataObj.rhNum} - ${dataObj.rhDesc}`);
        PageLft_Rcd.addContent(Panel_ReqHdrEdt);
        TogBtnMidCol_ReqHdrEdt.setIcon("sap-icon://detail-more");
    }

    // //Request Detail Edit Panel
    // export function loadPanel_ReqDtlEdt(dataContext: sap.ui.model.Context) {
    //     console.log("loadPanel_ReqDtlEdt");
    //     setDP_RcdPageLayout();
    //     SimpleForm_ReqDtlEdt.setModel(dataContext.getModel());
    //     PageLft_Rcd.removeAllContent();
    //     Panel_ReqHdrEdt.setExpanded(false);
    //     Panel_ReqDtlEdt.setHeaderText("Master Data Request Detail");
    //     TogBtnMidCol_ReqDtlEdt.setIcon("sap-icon://detail-more");
    //     PageLft_Rcd.addContent(Panel_ReqDtlEdt);
    // }

    //Request Details Listing Panel
    export async function loadPanels_ReqDtlAndTsk(rhNum: number) {
        console.log(`loadPanel_ReqDtlLst - ${rhNum}`);
        setDP_RcdPageLayout();
        await ApiCalls.reqDtlLstGET();
        List_ReqDtl.setModel(modelM_ReqDtl);
        console.log(modelM_ReqDtl.getJSON());
        Panel_ReqDtl.setHeaderText("Details");
        Panel_ReqTsk.setHeaderText("Tasks");
        PageMid_Rcd.addContent(Panel_ReqTsk);
        PageMid_Rcd.addContent(Panel_ReqDtl);
    }

    //Control page layout
    function setDP_RcdPageLayout() {
        let oFCL = FlexibleColumnLayout_Rcd;
        if (oFCL.getLayout() === sap.f.LayoutType.OneColumn) {
            oFCL.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
            TogBtnMidCol_ReqHdrEdt.setIcon("sap-icon://detail-less");
            //console.log("less");
        } else {
            oFCL.setLayout(sap.f.LayoutType.OneColumn);
            TogBtnMidCol_ReqHdrEdt.setIcon("sap-icon://detail-more");
            //console.log("more");
        }
    }
}

namespace ApiCalls {
    export async function reqDtlLstGET() {
        let options = {
            parameters: {
                where: "", // Optional
                select: "", // Optional
                take: "", // Optional
                skip: "", // Optional
                order: "", // Optional
            },
        };

        await apiReqDtlGET(options)
            .then((result) => {
                modelM_ReqDtl.setData(result);
                console.log("apiReqDtlGET completed:", JSON.stringify(result));
            })
            .catch((error) => {
                console.error("An error occurred:", error);
            });
        //console.log(modelM_ReqDtl.getModel());
    }
}

namespace UserData {
    export function getNameByUsername(username: string): string | null {
        const data = modelM_UserDataList.getData();
        const userRecord = data.userRecords.find((record) => record.username === username);
        return userRecord ? userRecord.name : null;
    }
}

namespace GeneralFunctions {
    export function dateFormatter(timeStampDate: string | number | Date): string {
        const date = new Date(timeStampDate);
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "short",
            year: "numeric",
        };
        const formattedDate = date.toLocaleDateString("en-US", options);
        return formattedDate;
    }

    export function getPage() {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
        var oHashChanger = sap.ui.core.routing.HashChanger.getInstance();
        var sHash = oHashChanger.getHash();
        var oRoute = oRouter.getRoute(sHash);
        return oRoute;
    }
}
