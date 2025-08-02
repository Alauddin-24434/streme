import DashNav from "components/dashboard/DashNav/DashNav";
import Sidebar from "components/dashboard/sidebar/sidebar";

export default function Layout({children}:{ children: React.ReactNode }) {
    return (
        <div className="lg:flex ">
                        <div className="sticky lg:fixed ml-1"  >
                            <Sidebar/>

                        </div>

                        <div className="w-full  lg:ml-48 ">
                          
                            <span className="">
                                <DashNav />
                            </span>
                            <div className=" h-auto  p-3 px-4 bg-slate-300">

                                {children}
                            </div>

                        </div>
                    </div>
    )
}


