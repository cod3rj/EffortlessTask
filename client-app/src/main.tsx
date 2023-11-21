import React from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css'
import {store, StoreContext} from "./app/stores/store.ts";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router/Routes.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
        <DndProvider backend={HTML5Backend}>
            <RouterProvider router={router}/>
        </DndProvider>
    </StoreContext.Provider>
  </React.StrictMode>,
)
