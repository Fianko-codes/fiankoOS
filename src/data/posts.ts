export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  publishDate: string;
  readingTime: number;
  slug: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "If AI Knew Everything, Would You Still Trust Me?",
    excerpt: "In a world where AI is getting perfect, why do we still crave the messy, imperfect words from another human? A raw take on trust, heartbreak, and why flaws might be our superpower.",
    content: `Picture this: It's late at night, the room is dimly lit by the glow of your screen, and you're staring into a shimmering crystal ball, not the old-school fortune-teller kind, but one pulsing with electric blue circuits, neural networks weaving like living veins inside the glass. It knows everything. Every secret you've ever Googled in incognito mode. The ending to that book you haven't finished. Why your ex really ghosted you. The exact winning lottery numbers for next week. It whispers answers before you even ask the question.

And yet... here you are, scrolling past it, clicking on my blog post instead.
Why?

That's the question we're diving into today: If AI knew everything, would you still trust me—a flawed human who sometimes gets things wrong, but always shoots straight from the heart?

Thanks for sticking around.

The AI is growing as rapidly as it ever could. It can now generate and complete your incomplete text message better than you. I, myself, have made AI write a proposal to a girl but then again, I didn't send it because it gave the corporate vibe similar to a business mail, where all I wanted was that deal-finalizing handshake. Then, I wrote the message myself, even though it wasn't perfect, and HOLY it was cringy, but I hit the send button there.

You know why? Might be because a human is an elegant mixture of imperfection alongside perfection, light with dark, like yin with yang. 

The further the AI advances with perfection, the further it separates and drifts apart from humankind. The AI will start to feel like a stalker more than a companion that knows every move that you are going to take, every thought you are going to think, and often times better than you. Which gives very creppy vibe to me.

But here's the thing, AI might give you the same exact text as me, but the one that AI gave is scraped out of data and other people's rants and posts from reddit… But mine? Haha… Comes from right where you've been, up until 3 am, with tears approaching my skin, just thinking "What the f*** am I doing with this life, what's my purpose? Doom-scrolling?..."

AI of course just knows this too, without feeling it.

In the other very important side, am not saying to ditch the AI, that's dumb. Humans are best at grabbing whatever is presented to them, fire, water, internet, and now AI. I believe humanity will get far superior with this new invention. Look at UI designers developing a website with their idea without spending a cent. Even the world of self-driving cars that was sci-fi around a decade ago is real now. And the optimization of GPUs in-game? 
They are now hundreds of time better than a decade earlier. 

From the economical perspective, ten years ago, at the end of 2015, Nvidia had a market capitalization of approximately $17.73 billion and now… upward of FOUR DAMN TRILLION DOLLARS. Not just Nvidia, unprecedented amount of money was invested in startups with unbelievable return. This isn't hype, this is reality, it's happening.

AI isn't the enemy. It's rocket fuel.

So yeah, if one day AI knows everything, would you still trust a flawed human like me that makes a mistake?

I think you already answered that by reading this far.

Thanks for sticking with an imperfect one today.

Drop in my DMs (in any social, or email, wherever): When's the last time raw human honesty hit you harder than perfect AI advice?

I'm genuinely curious.`,
    tags: ["AI", "humanity", "trust", "flaws"],
    category: "Reflections",
    publishDate: "2025-12-15",
    readingTime: 6,
    slug: "if-ai-knew-everything-would-you-still-trust-me"
  }
];
