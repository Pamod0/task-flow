import { ProfileForm } from "@/components/dashboard/profile-form";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight font-headline">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal and professional information.</p>
            </div>
            <ProfileForm />
        </div>
    );
}
