import {
  Brain,
  Workflow,
  GitBranch,
  LineChart,
  Users,
  ShieldCheck,
} from "lucide-react";

import SectionHeader from "./SectionHeader";

export default function Features() {
  const items = [
    {
      icon: Brain,
      title: "AI Co-pilots",
      desc: "Smart assistants that help your workflow.",
    },

    {
      icon: Workflow,
      title: "Neural Workflows",
      desc: "Visual task and project management.",
    },

    {
      icon: GitBranch,
      title: "GitHub Native",
      desc: "Integrated commits and pull requests.",
    },

    {
      icon: LineChart,
      title: "Live Analytics",
      desc: "Track productivity and progress live.",
    },

    {
      icon: Users,
      title: "Mentor Matchmaking",
      desc: "Find mentors based on your interests.",
    },

    {
      icon: ShieldCheck,
      title: "Secure by Default",
      desc: "Role-based secure collaboration.",
    },
  ];

  return (
    <section className="py-28">

      <div className="mx-auto max-w-7xl px-6">

        <SectionHeader
          eyebrow="Platform"
          title="Everything a Builder Needs"
          sub="Modern AI-powered tools built into one ecosystem."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {items.map((item) => (

            <div
              key={item.title}
              className="glass rounded-3xl p-6 hover:-translate-y-1 transition"
            >

              <item.icon className="h-8 w-8 text-cyan-400" />

              <h3 className="mt-4 text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-3 text-muted-foreground">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}