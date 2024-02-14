import toast from "react-hot-toast";

export function show_message(content: string, type: string) {

    if (type === "err") {
        toast.error(content,
            {
                duration: 1800,
                style: {
                    backgroundColor: "#141414",
                    border: '1px solid #414141',
                    padding: '16px',
                    color: '#ffffff',
                },
                iconTheme: {
                    primary: '#e03e3e',
                    secondary: '#141414',
                },
            }
        );
    } else {
        toast.success(content,
            {
                duration: 1500,
                style: {
                    backgroundColor: "#141414",
                    border: '1px solid #414141',
                    padding: '16px',
                    color: '#ffffff',
                },
                iconTheme: {
                    primary: '#11c647',
                    secondary: '#141414',
                },
            }
        );
    }
}
