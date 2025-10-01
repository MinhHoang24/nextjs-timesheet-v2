const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ position: 'absolute', top: '70px', left: '300px', margin: '30px 15px 0 15px', width: 'calc(100% - 330px)' }}>
        <main>{children}</main>
    </div>
  );
};

export default MainLayout