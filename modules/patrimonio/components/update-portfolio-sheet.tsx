"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { pressTextControlClasses } from "@/components/motion/press-motion";
import type { PortfolioUpdateInput } from "@/lib/services/wealth-snapshot.service";
import {
  sumDistributionPercentages,
  updatePortfolioSnapshot,
} from "@/lib/services/wealth-snapshot.service";

type UpdatePortfolioSheetProps = {
  open: boolean;
  initialValues: PortfolioUpdateInput;
  labels: {
    acwi: string;
    oro: string;
    momentum: string;
  };
  onClose: () => void;
};

function toInputDate(value: string): string {
  return value.slice(0, 10);
}

export function UpdatePortfolioSheet({
  open,
  initialValues,
  labels,
  onClose,
}: UpdatePortfolioSheetProps) {
  const [updatedAt, setUpdatedAt] = useState(initialValues.updatedAt);
  const [acwi, setAcwi] = useState(String(initialValues.distribution.acwi));
  const [oro, setOro] = useState(String(initialValues.distribution.oro));
  const [momentum, setMomentum] = useState(
    String(initialValues.distribution.momentum),
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;

    setUpdatedAt(initialValues.updatedAt);
    setAcwi(String(initialValues.distribution.acwi));
    setOro(String(initialValues.distribution.oro));
    setMomentum(String(initialValues.distribution.momentum));
    setError(null);
  }, [open, initialValues]);

  const currentSum = useMemo(() => {
    const parsedAcwi = Number(acwi) || 0;
    const parsedOro = Number(oro) || 0;
    const parsedMomentum = Number(momentum) || 0;
    return parsedAcwi + parsedOro + parsedMomentum;
  }, [acwi, oro, momentum]);

  if (!open) return null;

  function handleClose() {
    onClose();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAcwi = Number(acwi);
    const parsedOro = Number(oro);
    const parsedMomentum = Number(momentum) || 0;

    if (
      !updatedAt ||
      Number.isNaN(parsedAcwi) ||
      Number.isNaN(parsedOro) ||
      Number.isNaN(parsedMomentum) ||
      parsedAcwi < 0 ||
      parsedOro < 0 ||
      parsedMomentum < 0
    ) {
      setError("Introduce porcentajes válidos.");
      return;
    }

    const sum = parsedAcwi + parsedOro + parsedMomentum;

    if (sum !== 100) {
      setError(`Los porcentajes deben sumar exactamente 100 % (ahora: ${sum} %).`);
      return;
    }

    const saved = updatePortfolioSnapshot({
      updatedAt,
      distribution: {
        acwi: parsedAcwi,
        oro: parsedOro,
        momentum: parsedMomentum,
      },
    });

    if (!saved) {
      setError("No se pudo guardar la distribución.");
      return;
    }

    onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Cerrar"
        onClick={handleClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />

      <form
        role="dialog"
        aria-modal
        aria-labelledby="update-portfolio-title"
        onSubmit={handleSubmit}
        className="relative mx-4 mb-[max(1.5rem,env(safe-area-inset-bottom))] w-full max-w-sm rounded-3xl border border-white/[0.08] bg-[#111113] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.55)] sm:mb-0"
      >
        <h3
          id="update-portfolio-title"
          className="text-lg font-medium tracking-[-0.02em] text-white/90"
        >
          Actualizar cartera
        </h3>

        <p className="mt-2 text-xs font-light leading-relaxed tracking-[-0.01em] text-white/35">
          Introduce la distribución actual de vuestra cartera en porcentajes.
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-light tracking-[-0.01em] text-white/35">
              Fecha de actualización
            </span>
            <input
              type="date"
              value={toInputDate(updatedAt)}
              onChange={(event) => setUpdatedAt(event.target.value)}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[0.9375rem] font-light tracking-[-0.01em] text-white/85 outline-none focus:border-white/[0.14]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-light tracking-[-0.01em] text-white/35">
              {labels.acwi} (%)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={acwi}
              onChange={(event) => {
                setAcwi(event.target.value);
                setError(null);
              }}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[0.9375rem] font-light tabular-nums tracking-[-0.01em] text-white/85 outline-none focus:border-white/[0.14]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-light tracking-[-0.01em] text-white/35">
              {labels.oro} (%)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={oro}
              onChange={(event) => {
                setOro(event.target.value);
                setError(null);
              }}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[0.9375rem] font-light tabular-nums tracking-[-0.01em] text-white/85 outline-none focus:border-white/[0.14]"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-light tracking-[-0.01em] text-white/35">
              {labels.momentum} (%)
            </span>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={momentum}
              onChange={(event) => {
                setMomentum(event.target.value);
                setError(null);
              }}
              className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[0.9375rem] font-light tabular-nums tracking-[-0.01em] text-white/85 outline-none focus:border-white/[0.14]"
            />
          </label>

          <p className="text-xs font-light tabular-nums tracking-[-0.01em] text-white/30">
            Total: {currentSum} %
          </p>

          {error ? (
            <p className="text-xs font-light tracking-[-0.01em] text-red-300/80">
              {error}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className={`rounded-full px-4 py-2 text-sm font-light tracking-[-0.01em] text-white/45 touch-manipulation ${pressTextControlClasses}`}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={`rounded-full border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-light tracking-[-0.01em] text-white/80 touch-manipulation ${pressTextControlClasses}`}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
