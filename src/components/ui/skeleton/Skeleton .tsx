interface SkeletonProps {
  width: string;
  height: string;
  classname?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width, height, classname }) => {
  return (
    <div className="space-y-2 animate-pulse">
      <div
        className={`bg-muted rounded ${classname}`}
        style={{ width, height }}
      ></div>
    </div>
  );
};

export default Skeleton;
