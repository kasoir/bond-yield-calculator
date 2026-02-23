import React from 'react';
import type { BondAnalyticsResponse } from './types.js';

interface AnalyticsResultsProps {
    data: BondAnalyticsResponse;
}

export const AnalyticsResults: React.FC<AnalyticsResultsProps> = ({ data }) => {
    const classificationClass = data.priceClassification.toLowerCase();

    return (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-title">Key Analytics</div>
            <div className="analytics-grid">
                <div className="metric-card">
                    <div className="metric-label">Current Yield</div>
                    <div className="metric-value">{data.currentYield.toFixed(2)}%</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Yield to Maturity</div>
                    <div className="metric-value">{data.ytm.toFixed(4)}%</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Total Interest</div>
                    <div className="metric-value">${data.totalInterestEarned.toFixed(2)}</div>
                </div>
                <div className="metric-card">
                    <div className="metric-label">Classification</div>
                    <div className={`metric-value ${classificationClass}`}>
                        {data.priceClassification}
                    </div>
                </div>
            </div>
        </div>
    );
};
