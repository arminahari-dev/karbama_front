import DateFormater from "@/utils/DateFormater";
import Skeleton from "../skeleton/Skeleton ";
import { PencilIcon } from "@heroicons/react/24/solid";

interface UserInfoCardProps {
  user?: {
    biography?: string;
    phoneNumber?: string;
    email?: string;
    createdAt?: string;
  };
  isLoading: boolean;
  onEdit: (field: "biography" | "phoneNumber" | "email") => void;
}

interface RenderFieldProps {
  label: string;
  value?: string | number | null;
  loading: boolean;
  onEdit: () => void;
  extraClass?: string;
}

const renderField = ({
  label,
  value,
  loading,
  onEdit,
  extraClass = "",
}: RenderFieldProps) =>
  loading ? (
    <Skeleton width="15rem" height="2rem" />
  ) : (
    <div className="flex items-center">
      <span>{label} :</span>&nbsp;
      <span className={`font-bold text-xl truncate ${extraClass}`}>
        {value}
      </span>
      &nbsp;
      <PencilIcon onClick={onEdit} className="size-4 cursor-pointer" />
    </div>
  );

export default function UserInfoCard({
  user,
  isLoading,
  onEdit,
}: UserInfoCardProps) {
  return (
    <div className="flex flex-col justify-center items-start gap-4 order-1 max-tablet:order-2 bg-foreground !p-4 border border-border rounded-lg h-full text-text">
      <h2 className="font-bold text-2xl">اطلاعات</h2>

      {renderField({
        label: "بایوگرافی",
        value: user?.biography,
        loading: isLoading,
        onEdit: () => onEdit("biography"),
        extraClass: user?.biography && "w-64",
      })}

      {renderField({
        label: "موبایل",
        value: user?.phoneNumber,
        loading: isLoading,
        onEdit: () => onEdit("phoneNumber"),
      })}

      {renderField({
        label: "ایمیل",
        value: user?.email,
        loading: isLoading,
        onEdit: () => onEdit("email"),
        extraClass: "w-max max-mobile-m:w-40",
      })}

      {isLoading ? (
        <Skeleton width="9rem" height="2rem" />
      ) : (
        <div className="flex items-center">
          <span>تاریخ عضویت :</span>&nbsp;
          <span className="font-bold text-xl">
            {user?.createdAt && DateFormater(user.createdAt)}
          </span>
        </div>
      )}
    </div>
  );
}
