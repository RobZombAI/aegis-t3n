import { useState } from 'react';
import {
  Lock,
  Eye,
  EyeOff,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Users,
} from 'lucide-react';
import {
  INITIAL_EMPLOYEES,
  executeConfidentialPayroll,
  type EmployeeRecord,
  type EnclaveAttestation,
} from '../services/aegisService';

export const PayrollSection: React.FC = () => {
  const [employees] = useState<EmployeeRecord[]>(INITIAL_EMPLOYEES);
  const [showRawSalaries, setShowRawSalaries] = useState(false);
  const [computing, setComputing] = useState(false);
  const [attestation, setAttestation] = useState<EnclaveAttestation | null>(null);

  const handleExecuteCompute = async () => {
    setComputing(true);
    try {
      const result = await executeConfidentialPayroll(employees);
      setAttestation(result);
    } catch (err) {
      console.error('Computation error:', err);
    } finally {
      setComputing(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Enterprise Context Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Confidential Compute Enclave Workflow (Intel SGX DCAP)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Confidential Enterprise Payroll Engine
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            In standard cloud environments, calculating compensation and tax withholding exposes employee bank details,
            identity, and exact pay to untrusted host OS memory and third-party AI models.
            <strong> Aegis-T3N</strong> executes all computations inside a hardware-isolated
            <strong> T3N SGX Enclave</strong>: only cryptographically verified aggregate disbursements exit the enclave.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Private Employee Dataset (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Private Employee Records in TEE Memory
              </h3>
            </div>
            
            {/* Privacy Toggle */}
            <button
              onClick={() => setShowRawSalaries((prev) => !prev)}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 transition font-mono"
            >
              {showRawSalaries ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enclave Mask</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Reveal Local Data</span>
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-slate-500 border-b border-slate-800/80">
                  <th className="pb-2">Employee</th>
                  <th className="pb-2">Dept</th>
                  <th className="pb-2">Tax Rate</th>
                  <th className="pb-2 text-right">Compensation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-2.5 font-sans font-semibold text-white">
                      {emp.name}
                      <span className="block text-[10px] font-mono text-slate-500">{emp.id}</span>
                    </td>
                    <td className="py-2.5 text-slate-400 font-sans">{emp.department}</td>
                    <td className="py-2.5 text-slate-300">{emp.taxBracketPct}%</td>
                    <td className="py-2.5 text-right font-bold">
                      {showRawSalaries ? (
                        <span className="text-emerald-400">${emp.grossSalaryUsd.toLocaleString()} /mo</span>
                      ) : (
                        <span className="text-slate-500 font-mono tracking-widest">••••••••••</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2">
            <button
              onClick={handleExecuteCompute}
              disabled={computing}
              className="w-full py-3.5 px-6 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/20 transition transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {computing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Computing inside T3N SGX Enclave...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4" />
                  <span>Execute Confidential Enclave Calculation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Verified Attestation Certificate (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-800">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Enclave Attestation Seal
                </h3>
                <span className="text-[11px] text-slate-400">Verifiable Output Certificate</span>
              </div>
            </div>

            {attestation ? (
              <div className="mt-4 space-y-4 animate-in fade-in duration-300">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Enclave Attested
                  </span>
                  <span className="text-emerald-300">SGX DCAP Valid</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Total Gross Payroll</span>
                    <span className="text-lg font-black text-white font-mono mt-0.5 block">
                      ${attestation.totalGrossPayrollUsd.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[11px] text-slate-500 block">Withheld Taxes</span>
                    <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">
                      ${attestation.totalTaxWithheldUsd.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30">
                  <span className="text-[11px] font-semibold text-cyan-300 block">Net Employee Disbursement</span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-2xl font-black text-cyan-400 font-mono">
                      ${attestation.totalNetDisbursementUsd.toLocaleString()}
                    </span>
                    <span className="text-xs font-bold text-cyan-300">USD</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Verified across {attestation.employeeCount} encrypted personnel records
                  </p>
                </div>

                <div className="space-y-1.5 text-xs font-mono">
                  <span className="text-slate-500 text-[10px] uppercase">Cryptographic Attestation Hash:</span>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 break-all text-[10px] text-slate-300">
                    {attestation.enclaveAttestationHash}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2 border-t border-slate-800">
                  <span>Execution ID: {attestation.executionId}</span>
                  <span>Node: cn-api.sg</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <Lock className="w-6 h-6 text-slate-600" />
                </div>
                <h4 className="text-sm font-bold text-white">Awaiting Enclave Execution</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the computation button on the left to trigger confidential processing inside T3N hardware enclaves.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
