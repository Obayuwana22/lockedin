

const OutletHeaders = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mb-5">
      <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default OutletHeaders;
