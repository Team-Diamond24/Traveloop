import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { SkeuoCard, SkeuoButton, SkeuoInput, SkeuoTextarea, SkeuoPill, SkeuoBadge } from "@/components/Skeuo";
import { Search, Filter, Layers, ArrowDownAZ, MapPin, Heart, Send } from "lucide-react";
import { toast } from "sonner";

export default function Community() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [q, setQ] = useState("");
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({ trip_title: "", content: "", location: "", image: "" });

    return (
        <div className="space-y-6" data-testid="community-page">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-sandy-900">Community</h1>
                    <p className="text-sandy-700 mt-1">Where travelers share stories worth following.</p>
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
                <div className="md:col-span-2 text-center py-10 text-sandy-700">
                    <SkeuoCard inset className="py-16">
                        <div className="text-4xl mb-4">🌍</div>
                        <h3 className="text-xl font-bold text-sandy-900 mb-2">Community Hub Coming Soon</h3>
                        <p className="text-sandy-700 max-w-md mx-auto">Share your travel stories, tips, and photos with fellow explorers. This feature is being crafted with care.</p>
                    </SkeuoCard>
                </div>
            </div>
        </div>
    );
}
