import Link from "next/link";
import { Newspaper } from "lucide-react";
import { blogPosts } from "@/lib/articles";
import { Section, SectionHeader } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/page/cards";
import { Stagger, StaggerItem } from "@/components/motion/reveal";

export function Blog() {
  return (
    <Section id="blog">
      <SectionHeader badge="Blog" icon={Newspaper} title="AI Automation Insights and Playbooks" subtitle="What we are learning while putting automation and software into production." />
      <Stagger className="mx-auto grid w-full max-w-[520px] grid-cols-1 gap-4 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <StaggerItem key={post.slug} className="h-full">
            <ArticleCard article={post} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/blog">Read the blog</Link>
        </Button>
      </div>
    </Section>
  );
}
