import React from 'react';
import type { CashFlow } from './types.js';

interface CashFlowTableProps {
    schedule: CashFlow[];
}

export const CashFlowTable: React.FC<CashFlowTableProps> = ({ schedule }) => {
    return (
        <div className="card">
            <div className="card-title">Cash Flow Schedule</div>
            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Period</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((flow) => (
                            <tr key={flow.period} className={flow.isPrincipal ? 'highlight-row' : ''}>
                                <td>{flow.period}</td>
                                <td className="amount">${flow.amount.toFixed(2)}</td>
                                <td>
                                    {flow.isPrincipal ? (
                                        <span className="badge principal">Coupon + Principal</span>
                                    ) : (
                                        <span className="badge coupon">Coupon</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
