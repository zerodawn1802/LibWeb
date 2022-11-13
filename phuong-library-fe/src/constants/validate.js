import * as yup from "yup";


export const validateRequired = (label= "thông tin") => yup
    .string()
    .required(`Vui lòng nhập ${label}`)

export const validateDate = (label= "thông tin") => yup
    .string()
    .required(`Vui lòng nhập ${label}`)

export const validateNumberRequired = (label = "thông tin") => yup
    .number()
    .typeError(`Thông tin ${label} phải là số`)
    .required(`Vui lòng nhập ${label}`)

export const validateUsername = yup
    .string()
    .required("Vui lòng nhập Username")
    .max(15, "Username tối đa 15 ký tự")
    .matches(
        /^[A-Za-z0-9]*$/,
        "Username gồm số và chữ, không phân biệt chữ hoa và chữ thường, không sử dụng ký tự đặc biệt"
    )

export const validateEmail = yup
    .string()
    .required("Vui lòng nhập Email")
    .max(40, "Email tối đa 40 ký tự")
    .email("Email không đúng định dạng")

export const validateNumber = yup
    .string()
    .required("Vui lòng nhập vào số")
    .matches(/^[0-9]+$/, {
        message: "Vui lòng nhập vào số", excludeEmptyString: true
    })
    
export const validatePassword = yup
    .string()
    .required(`Vui lòng nhập mật khẩu`)
    .max(40, "Mật khẩu tối đa 40 ký tự")
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,40})/,
        "Mật khẩu phải có từ 6 đến 32 ký tự, có ký tự chữ số, chữ hoa và chữ thường."
    )

export const validateConfirmPassword = (field = "newPassword") => {
    return yup
        .string()
        .required(`Vui lòng xác nhận mật khẩu`)
        .max(40, "Mật khẩu tối đa 40 ký tự")
        .min(6, "Mật khẩu tối thiểu 6 ký tự")
        .oneOf([yup.ref(field), null], "Mật khẩu nhập lại không khớp")
};

export const validateSelect = (label)=>{
    return yup
        .mixed()
        .required(`Vui lòng chọn ${label}`)
}
