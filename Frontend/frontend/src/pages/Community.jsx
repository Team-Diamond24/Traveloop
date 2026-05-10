import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SkeuoCard, SkeuoButton, SkeuoInput, SkeuoTextarea, SkeuoPill, SkeuoBadge } from "@/components/Skeuo";
import { Search, Filter, Layers, ArrowDownAZ, MapPin, Heart, Send } from "lucide-react";
import { toast } from "sonner";

const exampleStories = [
    {
        id: "story-1",
        user: {
            name: "Avery Miles",
            avatar: "https://i.pravatar.cc/120?img=32",
        },
        timestamp: "2h ago",
        tripTitle: "Sunrise Hike Above Queenstown",
        location: "Queenstown, New Zealand",
        content:
            "Started at 5:10 AM and reached the ridge right before sunrise. Cold hands, warm coffee, and the best sky gradient I have seen all year. If anyone is doing this trail, bring a windproof layer even in summer.",
        image: "",
        likes: 248,
        comments: [
            { id: "c1", user: "Nora K", timestamp: "1h ago", text: "That sky sounds unreal. Adding this to my winter list." },
            { id: "c2", user: "Dev R", timestamp: "55m ago", text: "Windproof tip saved me last month, totally agree." },
            { id: "c3", user: "Mika S", timestamp: "31m ago", text: "Did you need spikes at that hour?" },
        ],
    },
    {
        id: "story-2",
        user: {
            name: "Lena Ortiz",
            avatar: "https://i.pravatar.cc/120?img=47",
        },
        timestamp: "5h ago",
        tripTitle: "Street Food Night Crawl",
        location: "Bangkok, Thailand",
        content:
            "Three markets, seven snacks, one regret: I should have bought two mango sticky rice bowls. The grilled squid stand near the riverside was the highlight.",
        image:
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
        likes: 412,
        comments: [
            { id: "c1", user: "Rafael M", timestamp: "4h ago", text: "Now I am hungry and checking flights." },
            { id: "c2", user: "Juno P", timestamp: "3h ago", text: "Mango sticky rice is always the correct decision." },
        ],
    },
    {
        id: "story-3",
        user: {
            name: "Priya Nair",
            avatar: "https://i.pravatar.cc/120?img=5",
        },
        timestamp: "Yesterday",
        tripTitle: "Lost In The Medina",
        location: "Marrakesh, Morocco",
        content:
            "I got turned around for nearly an hour and ended up finding a tiny rooftop tea spot I never would have planned for. Sometimes the best itinerary is a little chaos.",
        image: "",
        likes: 189,
        comments: [
            { id: "c1", user: "Tariq A", timestamp: "20h ago", text: "This is exactly how I found my favorite rug shop there." },
            { id: "c2", user: "Elise W", timestamp: "18h ago", text: "Accidental discoveries are always the best stories." },
        ],
    },
    {
        id: "story-4",
        user: {
            name: "Mateo Chen",
            avatar: "https://i.pravatar.cc/120?img=14",
        },
        timestamp: "2d ago",
        tripTitle: "Blue Hour On The Bosphorus",
        location: "Istanbul, Turkiye",
        content:
            "Caught this just after sunset from the Galata side. Ferries crossing every few minutes made the whole skyline feel alive.",
        image:
            "https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1200&q=80",
        likes: 536,
        comments: [
            { id: "c1", user: "Sami L", timestamp: "1d ago", text: "The light is perfect here. Which lens did you use?" },
            { id: "c2", user: "Olivia J", timestamp: "1d ago", text: "This made me miss evening ferry rides so much." },
            { id: "c3", user: "Ken D", timestamp: "23h ago", text: "Great timing, those reflections are crisp." },
        ],
    },
    {
        id: "story-5",
        user: {
            name: "Hugo Bennett",
            avatar: "https://i.pravatar.cc/120?img=62",
        },
        timestamp: "3d ago",
        tripTitle: "Remote Workday In The Alps",
        location: "Interlaken, Switzerland",
        content:
            "Took calls from a cabin cafe with mountain views and finished early enough for a lakeside walk. Best work-life balance day I have had in months.",
        image:
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
        likes: 301,
        comments: [
            { id: "c1", user: "Bianca T", timestamp: "2d ago", text: "This is the dream setup honestly." },
            { id: "c2", user: "Rin C", timestamp: "2d ago", text: "Did the cafe have stable Wi-Fi for video calls?" },
        ],
    },
];

export default function Community() {
    const { user } = useAuth();
    const [q, setQ] = useState("");
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ trip_title: "", content: "", location: "", image: "" });
    const filteredStories = exampleStories.filter((story) => {
        if (!q.trim()) return true;
        const query = q.toLowerCase();
        return [story.user.name, story.tripTitle, story.location, story.content].some((field) =>
            field.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6" data-testid="community-page">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-sandy-900">Community</h1>
                    <p className="text-sandy-700 mt-1">
                        {user?.name ? `Welcome, ${user.name}. ` : ""}Where travelers share stories worth following.
                    </p>
                </div>
                <SkeuoButton onClick={() => setShow(!show)} data-testid="new-post-toggle">{show ? "Cancel" : "Share a story"}</SkeuoButton>
            </div>

            <SkeuoCard className="!p-3 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative flex items-center">
                    <Search className="absolute left-4 w-5 h-5 text-sandy-700" />
                    <SkeuoInput value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search community..." className="!pl-12" data-testid="community-search" />
                </div>
                <div className="flex gap-2">
                    <SkeuoPill><Layers className="w-4 h-4 inline mr-1" />Group</SkeuoPill>
                    <SkeuoPill><Filter className="w-4 h-4 inline mr-1" />Filter</SkeuoPill>
                    <SkeuoPill><ArrowDownAZ className="w-4 h-4 inline mr-1" />Sort</SkeuoPill>
                </div>
            </SkeuoCard>

            {show && (
                <SkeuoCard className="space-y-3" data-testid="new-post-form">
                    <SkeuoInput placeholder="Trip title (e.g. Greek Island Hop)" value={form.trip_title} onChange={(e) => setForm({ ...form, trip_title: e.target.value })} />
                    <SkeuoInput placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                    <SkeuoInput placeholder="Image URL (optional)" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                    <SkeuoTextarea rows={4} placeholder="Share a moment, a tip, a misadventure..." value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
                    <div className="flex justify-end"><SkeuoButton onClick={() => toast.info("Community posting coming soon!")} data-testid="post-submit"><Send className="w-4 h-4 inline mr-2" />Publish</SkeuoButton></div>
                </SkeuoCard>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredStories.length === 0 ? (
                    <div className="md:col-span-2 text-center py-8">
                        <SkeuoCard inset className="py-12">
                            <h3 className="text-xl font-bold text-sandy-900 mb-2">No stories match your search</h3>
                            <p className="text-sandy-700">Try another keyword for destination, title, or creator.</p>
                        </SkeuoCard>
                    </div>
                ) : (
                    filteredStories.map((story) => (
                        <SkeuoCard key={story.id} className="!p-0 overflow-hidden">
                            <div className="p-5 border-b border-sandy-200/70">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img
                                            src={story.user.avatar}
                                            alt={story.user.name}
                                            className="w-11 h-11 rounded-full object-cover shadow-skeuo-raised-sm"
                                        />
                                        <div className="min-w-0">
                                            <p className="font-semibold text-sandy-900 truncate">{story.user.name}</p>
                                            <p className="text-xs text-sandy-700">{story.timestamp}</p>
                                        </div>
                                    </div>
                                    <SkeuoBadge tone="sandy" className="shrink-0">
                                        <MapPin className="w-3 h-3" />
                                        {story.location}
                                    </SkeuoBadge>
                                </div>
                                <h3 className="text-lg font-bold text-sandy-900 mt-4">{story.tripTitle}</h3>
                                <p className="text-sandy-800 mt-2 leading-relaxed">{story.content}</p>
                            </div>

                            {story.image && (
                                <img
                                    src={story.image}
                                    alt={story.tripTitle}
                                    className="w-full h-56 sm:h-64 object-cover"
                                    loading="lazy"
                                />
                            )}

                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between text-sandy-800">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <Heart className="w-4 h-4 text-accent-600" />
                                        <span>{story.likes.toLocaleString()} likes</span>
                                    </div>
                                    <span className="text-sm text-sandy-700">{story.comments.length} comments</span>
                                </div>

                                <div className="space-y-3">
                                    {story.comments.map((comment) => (
                                        <div key={`${story.id}-${comment.id}`} className="rounded-xl bg-surface-main shadow-skeuo-inset-sm px-4 py-3">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-semibold text-sandy-900 truncate">{comment.user}</p>
                                                <p className="text-xs text-sandy-700 shrink-0">{comment.timestamp}</p>
                                            </div>
                                            <p className="text-sm text-sandy-800 mt-1">{comment.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </SkeuoCard>
                    ))
                )}
            </div>
        </div>
    );
}
