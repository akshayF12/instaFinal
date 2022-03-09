import React, { useContext, useCallback, useState, useEffect } from "react";
import NoteContext from "./context/NoteContext";
import { Context } from '@shopify/app-bridge-react'
import { Redirect } from '@shopify/app-bridge/actions';
import {
    Badge,
    Layout,
    Stack,
    Button,
    Frame,
    Page,
    Toast,
    VisuallyHidden
} from "@shopify/polaris";
function DashboardTitlebar(props) {

    const app = useContext(Context);
    const redirect = Redirect.create(app);

    const context = useContext(NoteContext);
    const { insta_post, ondatasave, alertText } = context;


    const BackhandleButton = () => {
        redirect.dispatch(Redirect.Action.APP, props.url);
    }

    return (
        <div className="dasboard_wraper">
            <div className="mt-2 mb-4">

                <Layout>
                    <Layout.Section>
                        <div className="pt-3">
                            <Stack>

                                <div><div className="Polaris-Page-Header__BreadcrumbWrapper Back_button">
                                    <nav role="navigation">
                                        <a
                                            className="Polaris-Breadcrumbs__Breadcrumb"
                                            href="#"
                                            data-polaris-unstyled="true"
                                            onClick={BackhandleButton}
                                        >
                                            <span className="Polaris-Breadcrumbs__Icon icon_back_button">
                                                <span className="Polaris-Icon">
                                                    <span className="Polaris-VisuallyHidden"></span>
                                                    <svg
                                                        viewBox="0 0 20 20"
                                                        className="Polaris-Icon__Svg"
                                                        focusable="false"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M17 9H5.414l3.293-3.293a.999.999 0 1 0-1.414-1.414l-5 5a.999.999 0 0 0 0 1.414l5 5a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414L5.414 11H17a1 1 0 1 0 0-2z"></path>
                                                    </svg>
                                                </span>
                                            </span>
                                        </a>
                                    </nav>
                                </div></div>


                                <div className="dassboard_title">
                                    <div className="Polaris-Header-Title">{props.title}</div>
                                </div>



                            </Stack>
                        </div>
                    </Layout.Section>
                </Layout>
            </div>
            <hr />
        </div>
    )
}

export default DashboardTitlebar