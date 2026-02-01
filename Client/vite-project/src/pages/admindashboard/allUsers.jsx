import React from "react";
import { useGetAllUsersQuery,useDeleteUserMutation,useUpdateUserMutation} from "../../Redux/user/userApi";
import Swal from "sweetalert2";
import { Table, Button, Badge } from "react-bootstrap";

const UsersManager = () => {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف حساب المستخدم نهائياً!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
    });

    if (result.isConfirmed) {
      await deleteUser(id);
      Swal.fire("تم!", "تم حذف المستخدم بنجاح.", "success");
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const roles = ["registered", "organizer", "admin"];
    const nextRole = roles[(roles.indexOf(currentRole) + 1) % roles.length];
    await updateUser({ id, role: nextRole });
    Swal.fire("تم!", `تم تغيير رتبة المستخدم إلى ${nextRole}.`, "success");
  };

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">إدارة المستخدمين</h2>
      <div className="card shadow border-0 rounded-4">
        <Table hover responsive className="mb-0">
          <thead className="bg-dark text-white">
            <tr>
              <th>الاسم</th>
              <th>الإيميل</th>
              <th>الرتبة</th>
              <th>تاريخ التسجيل</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <Badge bg={u.role === "admin" ? "danger" : u.role === "organizer" ? "success" : "primary"}>
                    {u.role}
                  </Badge>
                </td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                <td>
                  <Button variant="outline-warning" size="sm" className="me-2" onClick={() => handleChangeRole(u._id, u.role)}>
                    تغيير الرتبة
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(u._id)}>
                    <i className="bi bi-trash"></i> حذف
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UsersManager;