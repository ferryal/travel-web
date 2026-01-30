import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  Modal,
  Input,
} from "@/components/ui";

const users = [
  {
    id: "1",
    name: "Jane Cooper",
    email: "jane.cooper@bookmytix.com",
    avatar:
      "https://ui-avatars.com/api/?name=Jane+Cooper&background=e0e7ff&color=4f46e5",
    role: "Admin",
    department: "Operations",
    lastActive: "2 min ago",
    status: "online",
  },
  {
    id: "2",
    name: "Michael Foster",
    email: "michael.f@bookmytix.com",
    avatar:
      "https://ui-avatars.com/api/?name=Michael+Foster&background=f0fdf4&color=16a34a",
    role: "Manager",
    department: "Finance",
    lastActive: "15 min ago",
    status: "online",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@bookmytix.com",
    avatar:
      "https://ui-avatars.com/api/?name=Emma+Wilson&background=fef3c7&color=d97706",
    role: "Support",
    department: "Customer Service",
    lastActive: "1 hour ago",
    status: "away",
  },
  {
    id: "4",
    name: "Robert Chen",
    email: "robert.c@bookmytix.com",
    avatar:
      "https://ui-avatars.com/api/?name=Robert+Chen&background=fce7f3&color=db2777",
    role: "Analyst",
    department: "Marketing",
    lastActive: "3 hours ago",
    status: "offline",
  },
  {
    id: "5",
    name: "Sarah Kim",
    email: "sarah.k@bookmytix.com",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Kim&background=e0e7ff&color=4f46e5",
    role: "Manager",
    department: "Operations",
    lastActive: "5 min ago",
    status: "online",
  },
];

const roleColors: Record<string, "info" | "success" | "secondary" | "warning"> =
  {
    Admin: "info",
    Manager: "success",
    Support: "secondary",
    Analyst: "warning",
  };

const statusIndicators: Record<string, string> = {
  online: "bg-success-500",
  away: "bg-warning-500",
  offline: "bg-slate-300",
};

export function Users() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            User Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage team members, roles, and permissions.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon icon="solar:settings-linear" width={18} />
            Roles & Permissions
          </Button>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Icon icon="solar:user-plus-linear" width={18} />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Icon icon="solar:users-group-rounded-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Users</p>
              <p className="text-xl font-bold text-slate-900">24</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-50 text-success-600">
              <Icon icon="solar:check-circle-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Online Now</p>
              <p className="text-xl font-bold text-slate-900">8</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600">
              <Icon icon="solar:shield-check-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Admins</p>
              <p className="text-xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning-50 text-warning-500">
              <Icon icon="solar:history-linear" width={20} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Pending Invites</p>
              <p className="text-xl font-bold text-slate-900">5</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                width={16}
              />
              <input
                type="text"
                placeholder="Search users..."
                className="h-9 w-48 rounded-lg bg-slate-50 pl-9 pr-3 text-sm outline-none"
              />
            </div>
          </div>
        </CardHeader>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3">User</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full"
                        />
                        <span
                          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${
                            statusIndicators[user.status]
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <Badge variant={roleColors[user.role]}>{user.role}</Badge>
                  </td>
                  <td className="py-4 text-sm text-slate-600">
                    {user.department}
                  </td>
                  <td className="py-4">
                    <span className="text-xs text-slate-400">
                      {user.lastActive}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-600">
                        <Icon icon="solar:pen-linear" width={16} />
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-danger-50 hover:text-danger-600">
                        <Icon icon="solar:trash-bin-trash-linear" width={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        title="Add New User"
        description="Invite a new team member to the dashboard."
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="John" />
            <Input label="Last Name" placeholder="Doe" />
          </div>
          <Input label="Email" type="email" placeholder="john@bookmytix.com" />
          <Input label="Department" placeholder="Operations" />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button>Send Invite</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
