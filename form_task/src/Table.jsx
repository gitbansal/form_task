import * as React from "react";
import {
    DeleteRegular,
    EditRegular
} from "@fluentui/react-icons";
import {
    Avatar,
    TableBody,
    TableCell,
    TableRow,
    Table,
    TableHeader,
    TableHeaderCell,
    useFocusableGroup,
    TableCellLayout,
    Button
} from "@fluentui/react-components";


const columns = [
    { columnKey: "Name", label: "Name" },
    { columnKey: "Age", label: "Age" },
    { columnKey: "Department", label: "Department" },
    { columnKey: "Date of Joining", label: "Date of Joining" },
    { columnKey: "Action", label: "Action" },
];

const TableData = ({ items, handleDelete, handleEdit }) => {
    const focusableGroupAttr = useFocusableGroup({
        tabBehavior: "limited-trap-focus",
    });

    return (
        <Table size="small" aria-label="Table with small size">
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHeaderCell key={column.columnKey}>
                            {column.label}
                        </TableHeaderCell>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.length ? (
                    items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.employeeName}</TableCell>
                            <TableCell>{item.employeeAge}</TableCell>
                            <TableCell>{item.employeeDepartment}</TableCell>
                            <TableCell>{item.dateOfJoining}</TableCell>
                            <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                                <TableCellLayout>
                                    <Button onClick={() => handleEdit(item, index)} icon={<EditRegular />} aria-label="Edit" />
                                    <Button onClick={() => handleDelete(item, index)} icon={<DeleteRegular />} aria-label="Delete" />
                                </TableCellLayout>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5}>
                            <div style={{ textAlign: "center" }}>No Data found</div>
                        </TableCell>
                    </TableRow>
                )}

            </TableBody>
        </Table>
    );
};


export default TableData