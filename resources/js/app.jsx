import React from "react";
import ReactDOM from "react-dom/client";
// sweetalert2
import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import "./bootstrap";
import App from "./components/App";

window.Swal = Swal;
const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

window.toast = toast;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
