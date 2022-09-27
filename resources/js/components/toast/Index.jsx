import * as iziToast from "izitoast/dist/js/iziToast";

const Index = (theme = "success", title = "", message = "") => {
    const THEMES = {
        info: {
            color: "blue",
            icon: "ico-info",
        },
        success: {
            color: "green",
            icon: "ico-success",
        },
        warning: {
            color: "orange",
            icon: "ico-warning",
        },
        error: {
            color: "red",
            icon: "ico-error",
        },
        question: {
            color: "yellow",
            icon: "ico-question",
        },
    };

    return iziToast.show({
        ...THEMES[theme],
        title,
        message,
    });
};

export default Index;
