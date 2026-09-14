import { createContext, useContext, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const PhoneCtx = createContext<HTMLElement | null>(null);

export function usePhoneRoot() {
  return useContext(PhoneCtx);
}

export function DeviceFrame({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState<HTMLDivElement | null>(null);
  return (
    <div className="stage">
      <p className="stage-caption">MeetReady · household season OS</p>
      <div className="phone" ref={setPhone}>
        <PhoneCtx.Provider value={phone}>
          <div className="phone-screen">{children}</div>
        </PhoneCtx.Provider>
      </div>
    </div>
  );
}

export function Overlay({ children }: { children: ReactNode }) {
  const root = usePhoneRoot();
  const node = <div className="overlay-root">{children}</div>;
  if (root) return createPortal(node, root);
  return node;
}
