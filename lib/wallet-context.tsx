"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  StellarWalletsKit,
  Networks,
} from "@creit.tech/stellar-wallets-kit";
import { xBullModule } from "@creit.tech/stellar-wallets-kit/modules/xbull";
import { FreighterModule } from "@creit.tech/stellar-wallets-kit/modules/freighter";
import { AlbedoModule } from "@creit.tech/stellar-wallets-kit/modules/albedo";
import { LobstrModule } from "@creit.tech/stellar-wallets-kit/modules/lobstr";
import { RabetModule } from "@creit.tech/stellar-wallets-kit/modules/rabet";
import { HanaModule } from "@creit.tech/stellar-wallets-kit/modules/hana";
import { supabase } from "./supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
}

interface WalletContextValue extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const WalletContext = createContext<WalletContextValue | null>(null);

const STELLAR_ADDRESS_KEY = "micro_wallet_address";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Assemble the default set of Stellar wallet modules.
 * Uses the individually exported modules from the package.
 */
function getModules() {
  return [
    new xBullModule(),
    new FreighterModule(),
    new AlbedoModule(),
    new LobstrModule(),
    new RabetModule(),
    new HanaModule(),
  ];
}

async function initKit() {
  if (typeof window === "undefined") return;
  const modules = getModules();
  StellarWalletsKit.init({
    modules,
    network: Networks.TESTNET,
  });
}

async function upsertWallet(address: string) {
  const { error } = await supabase.from("wallets").upsert(
    {
      stellar_address: address,
      last_seen_at: new Date().toISOString(),
    },
    { onConflict: "stellar_address" },
  );

  if (error) {
    console.error("Failed to upsert wallet in Supabase:", error.message);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isLoading: false,
    error: null,
  });

  const initRef = useRef(false);

  // Initialize the kit once on mount
  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    initKit().catch((err) => {
      console.error("Failed to init StellarWalletsKit:", err);
    });

    // Listen for disconnect events
    const unsub = StellarWalletsKit.on(
      "DISCONNECT" as never,
      () => {
        setState({
          address: null,
          isConnected: false,
          isLoading: false,
          error: null,
        });
        localStorage.removeItem(STELLAR_ADDRESS_KEY);
      },
    );

    return () => {
      unsub();
    };
  }, []);

  const connect = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Ensure kit is initialized
      await initKit();

      // Open the wallet selection modal and get the address
      const { address } = await StellarWalletsKit.authModal();

      if (!address) {
        throw new Error("No address returned from wallet");
      }

      // Persist wallet to Supabase
      await upsertWallet(address);

      // Persist locally
      localStorage.setItem(STELLAR_ADDRESS_KEY, address);

      setState({
        address,
        isConnected: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to connect wallet";
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    StellarWalletsKit.disconnect().catch(console.error);
    setState({
      address: null,
      isConnected: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem(STELLAR_ADDRESS_KEY);
  }, []);

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet must be used within <WalletProvider>");
  }
  return ctx;
}