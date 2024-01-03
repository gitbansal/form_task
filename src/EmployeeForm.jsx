import * as React from "react";
import {
    makeStyles,
    mergeClasses,
    shorthands,
    tokens,
    useId,
    Input,
    Label,
    Button
} from "@fluentui/react-components";
import Table from "./Table";
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles({
    base: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "800px",
        background: "white",
        width: "500px",
        padding: "25px",
        borderRadius: "15px",
    },
    field: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalXXS,
        color: "white",
        marginTop: tokens.spacingVerticalMNudge,
        ...shorthands.padding(tokens.spacingHorizontalMNudge),
    },
    filledLighter: {
        border: `1px solid ${tokens.colorNeutralForegroundInverted2}`,
        "> label": {
            color: tokens.colorBrandForegroundInverted,
        },
    },
    buttonContainer: {
        marginTop: "10px",
        display: "flex",
        gap: "10px",
    },
    wrapper: {
        columnGap: "15px",
        display: "flex",
    },
});

const EmployeeForm = () => {
    const nameId = useId("employee-name");
    const ageId = useId("employee-age");
    const departmentId = useId("employee-department");
    const dateOfJoiningId = useId("employee-date-of-joining");
    const styles = useStyles();
    const [formData, setFormData] = React.useState({
        id: null,
        employeeName: "",
        employeeAge: "",
        employeeDepartment: "",
        dateOfJoining: "",
    });
    const [WholeData, setWholeData] = React.useState([]);
    const [isSubmit, setIsSubmit] = React.useState(false);
    const [isUpdate, setIsUpdate] = React.useState("");

    React.useEffect(() => {
        const storedData = localStorage.getItem("employeeFormData");
        if (!storedData) {
            localStorage.setItem("employeeFormData", JSON.stringify([]));
        } else {
            const existingData = JSON.parse(storedData);
            localStorage.setItem("employeeFormData", JSON.stringify(existingData));
            setWholeData(existingData);
        }
    }, []);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleDelete = (id) => {
        if(isUpdate){
            toast.dismiss();
            toast.error("Deletion is currently restricted as an update is in progress.");
            return
        }
        const storedData = localStorage.getItem("employeeFormData");
        if (storedData || WholeData.length) {
            const existingData = JSON.parse(storedData);
            const updatedData = existingData.filter((item) => item.id !== id);
            localStorage.setItem("employeeFormData", JSON.stringify(updatedData));
            setWholeData(updatedData);
        }
    };

    const handleUpdate = () => {
        setIsSubmit(true);
        const isValidFormData =
            formData.employeeName !== "" &&
            formData.employeeAge !== "" &&
            formData.employeeDepartment !== "" &&
            formData.dateOfJoining !== "";

        const storedData = localStorage.getItem("employeeFormData");
        if (storedData && isValidFormData) {
            const existingData = JSON.parse(storedData);
            const updatedData = existingData.map((item) => {
                if (item.id === isUpdate) {
                    return formData;
                } else {
                    return item;
                }
            });
            localStorage.setItem("employeeFormData", JSON.stringify(updatedData));
            setWholeData(updatedData);
            setIsUpdate("")
            setIsSubmit(false)
            setFormData({
                id: null,
                employeeName: "",
                employeeAge: "",
                employeeDepartment: "",
                dateOfJoining: "",
            })
        }
    }


    const handleEdit = (data) => {
        setIsUpdate(data.id)
        setFormData(data)
    }

    const handleSubmit = () => {
        setIsSubmit(true);
        const isValidFormData =
            formData.employeeName !== "" &&
            formData.employeeAge !== "" &&
            formData.employeeDepartment !== "" &&
            formData.dateOfJoining !== "";

        if (isValidFormData) {
            const newId = Date.now();
            formData.id = newId;
            localStorage.setItem("employeeFormData", JSON.stringify([...WholeData, formData]));
            setWholeData((prevData) => [...prevData, formData]);
            setIsSubmit(false);
            setFormData({
                id: null,
                employeeName: "",
                employeeAge: "",
                employeeDepartment: "",
                dateOfJoining: "",
            })
        }
    };


    const handleClear = () => {
        setFormData({
            id: null,
            employeeName: "",
            employeeAge: "",
            employeeDepartment: "",
            dateOfJoining: "",
        });
        setIsUpdate("")
    };

    return (
        <>
            <div className={styles.base} style={{ padding: "10px", borderRadius: "10px",margin:"auto" }}>
                <div style={{ textAlign: "center", fontWeight: "600", fontSize: "16px" }}>Employee Form</div>
                <div className={mergeClasses(styles.field, styles.filledLighter)}>
                    <Label htmlFor={nameId} className={styles.label}>Employee Name</Label>
                    <Input
                        appearance="outline"
                        id={nameId}
                        value={formData.employeeName}
                        onChange={(e) => handleChange("employeeName", e.target.value)}
                    />
                    {isSubmit && !formData.employeeName ?
                        <div style={{ color: "red", fontSize: "12px" }}>
                            Please Enter the Emloyee Name
                        </div> : null}
                </div>

                <div className={mergeClasses(styles.field, styles.filledLighter)}>
                    <Label htmlFor={ageId}>Employee Age</Label>
                    <Input
                        appearance="outline"
                        id={ageId}
                        type="number"
                        value={formData.employeeAge}
                        onChange={(e) => handleChange("employeeAge", e.target.value)}
                    />
                    {isSubmit && !formData.employeeAge ?
                        <div style={{ color: "red", fontSize: "12px" }}>
                            Please Enter the Emloyee Age
                        </div> : null}
                </div>

                <div className={mergeClasses(styles.field, styles.filledLighter)}>
                    <Label htmlFor={departmentId}>Employee Department</Label>
                    <Input
                        appearance="outline"
                        id={departmentId}
                        value={formData.employeeDepartment}
                        onChange={(e) =>
                            handleChange("employeeDepartment", e.target.value)
                        }
                    />
                    {isSubmit && !formData.employeeDepartment ?
                        <div style={{ color: "red", fontSize: "12px" }}>
                            Please Enter the Emloyee Department
                        </div> : null}
                </div>

                <div className={mergeClasses(styles.field, styles.filledLighter)}>
                    <Label htmlFor={dateOfJoiningId}>Date of Joining</Label>
                    <Input
                        appearance="outline"
                        id={ageId}
                        type="date"
                        value={formData.dateOfJoining}
                        onChange={(e) => handleChange("dateOfJoining", e.target.value)}
                    />
                    {isSubmit && !formData.dateOfJoining ?
                        <div style={{ color: "red", fontSize: "12px" }}>
                            Please Enter the Date Of Joining
                        </div> : null}
                </div>

                <div className={styles.buttonContainer} style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                    {!isUpdate ? <Button appearance="primary" onClick={handleSubmit}>Submit</Button> :
                        <Button appearance="primary" onClick={handleUpdate}>Update</Button>}
                    <Button onClick={handleClear}>Clear</Button>
                </div>
            </div>
            <div style={{ padding: "20px" }}>
                <Table items={WholeData} handleDelete={handleDelete} handleEdit={handleEdit} />
            </div>
            <ToastContainer />
        </>
    );
};

export default EmployeeForm;