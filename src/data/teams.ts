import type { Team } from "@/types";

export const teams: Team[] = [
  {
    id: "team-001",
    name: "Frontend Wizards",
    description: "Specializes in building modern UI with React and Tailwind.",
    domain: "frontend",
    members: [
      { userName: "Alice Johnson", id: "user-001" },
      { userName: "Mike Anderson", id: "user-013" },
    ],
    createdAt: new Date("2025-04-10"),
    updatedAt: new Date("2025-06-25"),
  },
  {
    id: "team-002",
    name: "Backend Builders",
    description:
      "Focuses on API development, databases, and system architecture.",
    domain: "backend",
    members: [
      { userName: "Bob Smith", id: "user-002" },
      { userName: "Oscar Gale", id: "user-015" },
    ],
    createdAt: new Date("2025-04-15"),
    updatedAt: new Date("2025-06-24"),
  },
  {
    id: "team-003",
    name: "DevOps Gurus",
    description: "Handles deployments, CI/CD, and infrastructure.",
    domain: "devops",
    members: [
      { userName: "Kevin Stone", id: "user-011" },
      { userName: "Xander Paul", id: "user-024" },
    ],
    createdAt: new Date("2025-03-20"),
    updatedAt: new Date("2025-06-20"),
  },
  {
    id: "team-004",
    name: "Design Ninjas",
    description: "Experts in UI/UX design, prototyping, and usability testing.",
    domain: "design",
    members: [
      { userName: "Julia Rose", id: "user-010" },
      { userName: "Tina Foster", id: "user-020" },
    ],
    createdAt: new Date("2025-04-05"),
    updatedAt: new Date("2025-06-15"),
  },
  {
    id: "team-005",
    name: "QA & Testing",
    description: "Responsible for writing and automating tests.",
    domain: "testing",
    members: [
      { userName: "Charlie Kim", id: "user-003" },
      { userName: "Quinn Lee", id: "user-017" },
    ],
    createdAt: new Date("2025-04-25"),
    updatedAt: new Date("2025-06-28"),
  },
  {
    id: "team-006",
    name: "Marketing Squad",
    description: "Manages content, SEO, and growth marketing.",
    domain: "marketing",
    members: [
      { userName: "Nina Watts", id: "user-014" },
      { userName: "Yara Javed", id: "user-025" },
    ],
    createdAt: new Date("2025-03-30"),
    updatedAt: new Date("2025-06-18"),
  },
];
