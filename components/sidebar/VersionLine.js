const VersionLine = ({ version, occurence }) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-medium text-sm tracking-widest">{version}</p>
      <p className="font-regular text-sm text-zinc-400">{occurence}</p>
    </div>
  );
};

export default VersionLine;
