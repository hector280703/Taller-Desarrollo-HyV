import { EntitySchema } from "typeorm";

const UserSchema = new EntitySchema({
  name: "User",
  tableName: "users",
    columns: {
    id: {
        type: "int",
        primary: true,
        generated: true,
    },
    nombreCompleto: {
        type: "varchar",
        length: 250,
        nullable: false,
    },
    email: {
        type: "varchar",
        length: 250,
        unique: true,
        nullable: false,
    },
    password: {
        type: "varchar",
        length: 250,
        nullable: false,
    },
    rol: {
        type: "varchar",
        length: 50,
        nullable: false,
    },
    createdAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        nullable: false,
    },
    updatedAt: {
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
        nullable: false,
    },
  },
});

export default UserSchema;