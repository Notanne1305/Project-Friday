<p align="center">
  <img src="frontend/public/favicon.svg" width="92" alt="Project Friday logo">
</p>

<h1 align="center">Project Friday</h1>

<p align="center">
  A Team Task & Workload Manager built with Laravel, React, and Material UI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?logo=laravel&logoColor=white" alt="Laravel 13">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Material_UI-9-007FFF?logo=mui&logoColor=white" alt="Material UI">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Spatie-Permission-4B32C3" alt="Spatie Laravel Permission">
</p>

## About Project Friday

Project Friday is a task and workload management MVP for teams. Administrators can create tasks, assign one task to multiple employees, and monitor all work on a Kanban board. Employees can view their assigned tasks and move them through the workflow: **To Do**, **In Progress**, and **Completed**.

The project uses Laravel as a REST API backend and React as a separate frontend application. Laravel manages validation, database relationships, uploaded task images, and JSON responses. React provides the interactive dashboard and immediately updates the board when a task status changes.

## Features

- Create tasks and assign multiple employees through a multi-select field.
- View every task in the administrator dashboard.
- View an employee's assigned tasks in the My Work board.
- Move tasks between Pending, In Progress, and Completed using drag and drop.
- Create employee accounts with validated, hashed passwords.
- Assign the Employee role automatically through Spatie Laravel Permission.
- Set a task priority, deadline, optional description, and optional image.
- Display assigned employees as avatars on each task card.
- Return consistent JSON responses using Laravel API Resources.

## Technology Stack

- **Backend:** Laravel 13, PHP 8.3, Eloquent ORM, MySQL
- **Frontend:** React 19, Vite, Axios, Material UI
- **Roles:** Spatie Laravel Permission
- **Styling:** Material UI and custom Kanban CSS

## Architecture

The backend follows Laravel's MVC pattern:

- **Models:** `User` and `Task` represent the application data and define Eloquent relationships.
- **Controllers:** `TaskController` and `UserController` receive API requests, validate input, execute business logic, and return responses.
- **Views:** The user interface is a separate React frontend made from reusable components such as `AdminDashboard`, `MyWorkBoard`, `CreateTaskForm`, and `KanbanBoard`.

## Database Design

The project uses a many-to-many relationship between users and tasks. A user can receive many tasks, and a task can be assigned to many users.

```text
users                    task_user                    tasks
-----                    ---------                    -----
id <--------------------- user_id                      id
name                     task_id ------------------->  title
email                                                -> description
password                                             -> status
                                                     -> image_url
                                                     -> priority
                                                     -> deadline
```

The `task_user` table is the pivot table. Laravel defines this relationship with `belongsToMany()` in both the `User` and `Task` models. When a task is created, `sync()` saves the selected employee IDs to the pivot table.

## Role Management

Spatie Laravel Permission manages the `admin` and `employee` roles instead of a custom role column in the `users` table.

- `HasRoles` is included in the `User` model.
- `RoleSeeder` creates the Admin and Employee roles.
- New users created from the application are assigned the `employee` role.
- The employee dropdown fetches users through `User::role('employee')`.

> The current MVP uses an Admin/Employee view toggle, as suggested in the task brief. In a production version, authentication and Spatie role middleware should also protect the API endpoints.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/users` | List employees for the assignment dropdown. |
| `POST` | `/api/users` | Create an employee and assign the Employee role. |
| `GET` | `/api/tasks` | Retrieve all tasks with assigned employees. |
| `POST` | `/api/tasks` | Create a task and assign selected employees. |
| `GET` | `/api/my-tasks/{userId}` | Retrieve tasks assigned to one employee. |
| `PATCH` | `/api/tasks/{id}/status` | Update a task status. |

## Project Structure

```text
project-friday/
|-- backend/                         # Laravel API
|   |-- app/Models/                  # User and Task models
|   |-- app/Http/Controllers/Api/    # Task and user API controllers
|   |-- app/Http/Resources/          # JSON response resources
|   |-- database/migrations/         # Tables and pivot table
|   |-- database/seeders/            # Role seeder
|   `-- routes/api.php               # API routes
|
|-- frontend/                        # React application
|   |-- src/components/              # Forms and Kanban components
|   |-- src/pages/                   # Admin and employee views
|   |-- src/services/                # Axios API services
|   `-- src/App.jsx                  # Application shell and view toggle
|
`-- README.md
```

## Installation and Setup

### 1. Configure the backend

```bash
cd backend
composer install
copy .env.example .env
php artisan key:generate
```

Update the database values in `backend/.env`, then run:

```bash
php artisan migrate
php artisan db:seed --class=RoleSeeder
php artisan storage:link
php artisan serve
```

The Laravel API runs at `http://localhost:8000` by default.

### 2. Configure the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite will show the local URL for the React application, usually `http://localhost:5173`.

## Workflow

1. Switch to the **Admin** view.
2. Add employees if needed.
3. Create a task, select one or more employees, and optionally add a priority, deadline, or image.
4. Switch to the **Employee** view and select an employee.
5. Drag an assigned task to another Kanban column to update its status.

## Future Improvements

- Add login and authentication with Laravel Sanctum.
- Protect routes with Spatie role and permission middleware.
- Ensure only an assigned employee can update a task's status.
- Add validation feedback directly in the frontend form.
- Add task editing, deletion, filtering, and search.

## License

This project is created for educational purposes.
