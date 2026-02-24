import { prisma } from "@/lib/Prisma";
import React from "react";
import PageHeader from "@/app/components/PageHeader";
import Section from "@/app/components/Section";
import EditMeetingForm from "@/app/meetings/edit/EditMeetingForm";
import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { FileEdit } from "lucide-react";

async function EditMeeting({ params }: { params: Promise<{ MeetingID: string }> }) {
    const session = await requireUser();
    const role = session.role;

    if (role !== 'admin' && role !== 'meeting_convener') {
        redirect("/");
    }

    const { MeetingID } = await params;

    const data = await prisma.meetings.findFirst({
        where: {
            MeetingID: Number(MeetingID),
        },
    });

    if (!data) {
        redirect("/meetings");
    }

    if (role === 'meeting_convener' && data.CreatedBy !== session.StaffID) {
        redirect("/meetings");
    }

    const meetingTypes = await prisma.meetingtype.findMany();

    return (
        <div className="bg-pattern min-h-screen pb-12">
            <PageHeader
                title="Edit Meeting"
                description={`Updating session parameters for PRO-${MeetingID}.`}
                icon={FileEdit}
                backHref={`/meetings/${MeetingID}`}
            />

            <Section>
                <div className="max-w-3xl mx-auto">
                    <EditMeetingForm meeting={data} meetingTypes={meetingTypes} />
                </div>
            </Section>
        </div>
    );
}

export default EditMeeting;
