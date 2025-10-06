import LoginForm from "@/components/pages/loginForm/LoginForm";

export default function Login() {
    
    return (
        <div>
            <div className="login-container bg-[#00bcd4] h-screen">
                <div className="login-box max-w-[360px] mx-auto box-border pt-[82px] animate-[slideIn_.5s_ease-out_forwards]">
                    <div className="logo mb-5">
                        <a className="text-4xl text-center text-white block w-full">Timesheet</a>
                    </div>

                    {/* login form */}
                    <LoginForm />

                    <div className="login-footer text-[#e9e9e9] text-center text-sm">
                        <small>
                            © 2025 Timesheet. 
                            <b>Version </b>
                            4.3.0.0 [20252309]
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}