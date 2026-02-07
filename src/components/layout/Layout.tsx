import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";

export function Layout() {
    return (
        <div className='min-h-screen w-full bg-white dark:bg-black text-black dark:text-white'>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
}