export interface Technology {
  name: string;
  icon: string;
  color: string; // Color hover/glow effect
}

export interface TechCategory {
  title: string;
  technologies: Technology[];
}

export const techStack: TechCategory[] = [
  {
    title: "Lenguajes",
    technologies: [
      {
        name: "TypeScript",
        icon: "/assets/static/typescript.svg",
        color: "#3178C6",
      },
      {
        name: "JavaScript",
        icon: "/assets/static/javascript.svg",
        color: "#F7DF1E",
      },
      { name: "Java", icon: "/assets/static/java.svg", color: "#F89820" },
      { name: "Python", icon: "/assets/static/python.svg", color: "#3776AB" },
      { name: "PHP", icon: "/assets/static/php.svg", color: "#777BB4" },
    ],
  },
  {
    title: "Frontend",
    technologies: [
      { name: "Angular", icon: "/assets/static/angular.svg", color: "#DD0031" },
      { name: "Astro", icon: "/assets/static/astro.svg", color: "#FF5D01" },
      { name: "React", icon: "/assets/static/react.svg", color: "#61DAFB" },
      {
        name: "Tailwind",
        icon: "/assets/static/tailwind.svg",
        color: "#06B6D4",
      },
      { name: "HTML5", icon: "/assets/static/html5.svg", color: "#E34F26" },
      { name: "CSS3", icon: "/assets/static/css3.svg", color: "#1572B6" },
    ],
  },
  {
    title: "Backend",
    technologies: [
      {
        name: "Spring Boot",
        icon: "/assets/static/spring.svg",
        color: "#6DB33F",
      },
      { name: "Node.js", icon: "/assets/static/node.svg", color: "#339933" },
      { name: "GraphQL", icon: "/assets/static/graphql.svg", color: "#E10098" },
      { name: "MyBatis", icon: "/assets/static/mybatis.svg", color: "#008FBB" },
    ],
  },
  {
    title: "Bases de Datos",
    technologies: [
      {
        name: "PostgreSQL",
        icon: "/assets/static/postgresql.svg",
        color: "#4169E1",
      },
      { name: "Oracle", icon: "/assets/static/oracle.svg", color: "#F80000" },
      {
        name: "SQL Server",
        icon: "/assets/static/sqlserver.svg",
        color: "#CC2927",
      },
      {
        name: "Liquibase",
        icon: "/assets/static/liquibase.svg",
        color: "#2962FF",
      },
    ],
  },
  {
    title: "Cloud & DevOps",
    technologies: [
      { name: "AWS", icon: "/assets/static/aws.svg", color: "#FF9900" },
      { name: "Docker", icon: "/assets/static/docker.svg", color: "#2496ED" },
      {
        name: "Terraform",
        icon: "/assets/static/terraform.svg",
        color: "#7B42BC",
      },
      { name: "Vercel", icon: "/assets/static/vercel.svg", color: "#7B7B7B" },
    ],
  },
  {
    title: "Herramientas",
    technologies: [
      { name: "Git", icon: "/assets/static/git.svg", color: "#F05032" },
      { name: "VS Code", icon: "/assets/static/vscode.svg", color: "#007ACC" },
      { name: "Maven", icon: "/assets/static/maven.svg", color: "#C71A36" },
      { name: "NPM", icon: "/assets/static/npm.svg", color: "#CB3837" },
      { name: "Figma", icon: "/assets/static/figma.svg", color: "#F24E1E" },
      { name: "Karma", icon: "/assets/static/karma.svg", color: "#56C5A8" },
    ],
  },
];
