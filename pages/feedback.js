import useSWR from "swr";

import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import DashboardShell from "@/components/DashboardShell";
import FeedbackTable from "@/components/FeedbackTable";
import FeedbackEmptyState from "@/components/FeedbackEmptyState";
import FeedbackTableHeader from "@/components/FeedbackTableHeader";
import FeedbackTableSkeleton from "@/components/FeedbackTableSkeleton.js";

const Feedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data?.feedback?.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

export default Feedback;
