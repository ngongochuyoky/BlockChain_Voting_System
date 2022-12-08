import { Fragment, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, voterPrivateRoutes, companyPrivateRoutes } from '~/routers';
import { DefaltLayout } from './layout';
import ProtectedRoutes from '~/component/ProtectedRoutes';
import Cookies from 'js-cookie';

export const UpdateRoutes = createContext();

function App() {
    const [updateNow, setUpdateNow] = useState(true);
    const updateRoutes = () => {
        setUpdateNow(!updateNow)
    }
    return (
        <UpdateRoutes.Provider value={updateRoutes}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaltLayout;
                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                        <Route
                            element={
                                <ProtectedRoutes
                                    redirectPath="/voter_login"
                                    isAllowed={!!Cookies.get('voter_token')}
                                />
                            }
                        >
                            {voterPrivateRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaltLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                        <Route
                            element={
                                <ProtectedRoutes
                                    redirectPath="/company_login"
                                    isAllowed={!!Cookies.get('company_token') }
                                />
                            }
                        >
                            {companyPrivateRoutes.map((route, index) => {
                                const Page = route.component;
                                let Layout = DefaltLayout;
                                if (route.layout) {
                                    Layout = route.layout;
                                } else if (route.layout === null) {
                                    Layout = Fragment;
                                }
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                </div>
            </Router>
        </UpdateRoutes.Provider>
    );
}

export default App;
