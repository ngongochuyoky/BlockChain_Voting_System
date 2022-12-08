import Header from "~/layout/component/Header";

function HeaderOnly(  {children} ) {
    return ( 
        <div>
            <Header />
            { children }
        </div>
     );
}

export default HeaderOnly;