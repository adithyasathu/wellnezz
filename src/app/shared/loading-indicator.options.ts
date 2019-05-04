// android and ios have some platform specific options

export const options = {
    message: "Loading...",
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        cancelListener(dialog) { console.log("Loading cancelled"); },
        max: 100,
        color: "#52992b",
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1,
        customView: "loading"
    },
    ios: {
        details: "Additional detail note!",
        margin: 10,
        dimBackground: true,
        color: "#52992b", // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: "yellow",
        customView: "loading",
        hideBezel: true // default false, can hide the surrounding bezel
    }
};
