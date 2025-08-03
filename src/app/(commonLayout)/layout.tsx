import MainNavbar from "@/components/common/MainNavbar/MainNavbar";

export default function Layout({children}:{ children: React.ReactNode }) {
    return (
        <div>
               <MainNavbar  />
                  
            <main>{children}</main>
        </div>
    )
}