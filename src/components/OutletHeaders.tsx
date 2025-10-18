

const OutletHeaders = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mb-5">
      <h1 className="text-xl xl:text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-sm xl:text:base text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default OutletHeaders;
