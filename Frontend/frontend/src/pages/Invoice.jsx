import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { SkeuoCard, SkeuoButton, SkeuoInput, SkeuoSelect } from "@/components/Skeuo";
import { ArrowLeft, Plus, Trash2, Download, FileText, Receipt } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { toast } from "sonner";

const PIE_COLORS = ["#4A90E2", "#7EB6FF", "#D4BFA6", "#B0987A", "#2C6CB0", "#22568D"];
const CATS = ["Hotel", "Travel", "Food", "Activity", "Misc"];

export default function Invoice() {
    const { id } = useParams();
    const { user } = useAuth();
    const [trip, setTrip] = useState(null);
    const [budget, setBudget] = useState(null);
    const [form, setForm] = useState({ category: "Hotel", description: "", quantity: 1, unit_cost: 0 });

    const load = async () => {
        try {
            const t = await api.get(`/trips/${id}`);
            setTrip(t.data?.data || t.data);
        } catch { }
        try {
            const b = await api.get(`/trips/${id}/budget`);
            setBudget(b.data?.data || b.data || null);
        } catch { setBudget(null); }
    };
    useEffect(() => { load(); }, [id]);

    if (!trip) return <div className="text-center text-sandy-700 py-20">Loading...</div>;

    const totalBudget = trip.total_budget || budget?.total_budget || 0;
    const transportCost = budget?.transport_cost || 0;
    const stayCost = budget?.stay_cost || 0;
    const activityCost = budget?.activity_cost || 0;
    const mealsCost = budget?.meals_cost || 0;
    const miscCost = budget?.misc_cost || 0;
    const totalSpent = transportCost + stayCost + activityCost + mealsCost + miscCost;
    const tax = +(totalSpent * 0.05).toFixed(2);
    const discount = 50;
    const grand = +(totalSpent + tax - discount).toFixed(2);
    const remaining = totalBudget - totalSpent;

    const byCat = [
        { name: "Transport", value: transportCost },
        { name: "Stay", value: stayCost },
        { name: "Activities", value: activityCost },
        { name: "Meals", value: mealsCost },
        { name: "Misc", value: miscCost },
    ].filter((d) => d.value > 0);

    const download = () => {
        const text = `Traveloop Invoice
Trip: ${trip.name}
Traveler: ${user?.first_name} ${user?.last_name}

Budget Breakdown:
Transport: $${transportCost}
Stay: $${stayCost}
Activities: $${activityCost}
Meals: $${mealsCost}
Misc: $${miscCost}

Subtotal: $${totalSpent}
Tax (5%): $${tax}
Discount: -$${discount}
Grand Total: $${grand}`;
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = `traveloop-${trip.id}.txt`; a.click();
    };

    return (
        <div className="space-y-6" data-testid="invoice-page">
            <Link to={`/trips/${id}`} className="text-ocean-700 font-semibold flex items-center gap-2"><ArrowLeft className="w-4 h-4" /> Back to my trip</Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SkeuoCard className="lg:col-span-2 !p-8 skeuo-paper relative">
                    <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-ocean-600 grid place-items-center shadow-skeuo-ocean">
                                <Receipt className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-widest text-sandy-700 font-bold">Trip to {(trip.destination || trip.name || "").split(",")[0]}</div>
                                <h1 className="text-2xl font-bold text-sandy-900">{trip.name}</h1>
                                <div className="text-xs text-sandy-700 mt-1">Booked by {user?.first_name} {user?.last_name}</div>
                            </div>
                        </div>
                        <div className="text-right text-xs text-sandy-700 space-y-0.5">
                            <div><span className="font-bold">Invoice #:</span> INV{trip.id.slice(0, 8).toUpperCase()}</div>
                            <div><span className="font-bold">Generated:</span> {new Date().toISOString().slice(0, 10)}</div>
                            <div><span className="font-bold">Status:</span> <span className="text-ocean-700 font-bold">Pending</span></div>
                            <div className="mt-2"><span className="font-bold">Traveler:</span> {user?.first_name} {user?.last_name}</div>
                            <div>{user?.email}</div>
                            <div>{user?.city}{user?.country && `, ${user.country}`}</div>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl shadow-skeuo-inset-sm bg-surface-main">
                        <table className="w-full text-sm">
                            <thead className="text-left text-sandy-700 uppercase text-xs bg-sandy-200/50">
                                <tr><th className="px-4 py-3">Category</th><th>Amount</th></tr>
                            </thead>
                            <tbody>
                                {byCat.length === 0 ? (
                                    <tr><td colSpan="2" className="text-center text-sandy-700 py-6">No budget data yet. Set up your trip budget.</td></tr>
                                ) : byCat.map((e, i) => (
                                    <tr key={i} className="border-t border-sandy-200/60 hover:bg-surface-card/40">
                                        <td className="px-4 py-3 font-semibold text-sandy-900">{e.name}</td>
                                        <td className="font-bold text-ocean-700">${e.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-5">
                        <div className="w-full sm:w-72 space-y-2 text-sm">
                            <div className="flex justify-between"><span>Subtotal</span><span className="font-bold">${totalSpent.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sandy-700"><span>Tax (5%)</span><span>+${tax}</span></div>
                            <div className="flex justify-between text-sandy-700"><span>Discount</span><span>-${discount}</span></div>
                            <div className="flex justify-between text-lg font-bold text-ocean-700 pt-2 border-t border-sandy-300/60"><span>Grand Total</span><span>${grand}</span></div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-6">
                        <SkeuoButton variant="secondary" onClick={download}><Download className="w-4 h-4 inline mr-2" />Download Invoice</SkeuoButton>
                        <SkeuoButton variant="secondary"><FileText className="w-4 h-4 inline mr-2" />Export as PDF</SkeuoButton>
                        <SkeuoButton>Mark as paid</SkeuoButton>
                    </div>
                </SkeuoCard>

                <div className="space-y-5">
                    <SkeuoCard>
                        <h3 className="font-bold text-sandy-900 mb-4">Budget Overview</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span>Total Budget</span><span className="font-bold">${totalBudget}</span></div>
                            <div className="flex justify-between"><span>Total Spent</span><span className="font-bold text-ocean-700">${totalSpent.toFixed(2)}</span></div>
                            <div className="flex justify-between text-sandy-700"><span>Remaining</span><span className={`font-bold ${remaining < 0 ? "text-red-600" : ""}`}>${remaining.toFixed(2)}</span></div>
                        </div>
                        <div className="h-44 mt-4">
                            {byCat.length === 0 ? (
                                <div className="text-center text-xs text-sandy-700 pt-8">Set up your budget to see breakdown</div>
                            ) : (
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={byCat} dataKey="value" cx="50%" cy="50%" outerRadius={60} label={(d) => d.name}>
                                            {byCat.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                        <Link to={`/trips/${id}`}><SkeuoButton variant="secondary" className="w-full mt-2">Back to Trip</SkeuoButton></Link>
                    </SkeuoCard>
                </div>
            </div>
        </div>
    );
}
