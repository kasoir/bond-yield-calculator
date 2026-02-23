import React, { useState } from 'react';
import { BondForm } from './BondForm.js';
import { AnalyticsResults } from './AnalyticsResults.js';
import { CashFlowTable } from './CashFlowTable.js';
import type { BondParameters, BondAnalyticsResponse } from './types.js';

function App() {
    const [analytics, setAnalytics] = useState<BondAnalyticsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = async (params: BondParameters) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:3000/bond/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data: BondAnalyticsResponse = await response.json();
            setAnalytics(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch analytics');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-title">Bond Yield Calculator</h1>
                <p className="app-subtitle">Enter bond parameters to compute key financial analytics.</p>
            </header>

            <div className="app-body">
                <div>
                    <div className="card">
                        <div className="card-title">Parameters</div>
                        <BondForm onSubmit={fetchAnalytics} isLoading={isLoading} />
                    </div>
                    {error && <div className="error-msg">{error}</div>}
                </div>

                <div className="results-panel">
                    {analytics ? (
                        <div className="animate-in" key={analytics.ytm}>
                            <AnalyticsResults data={analytics} />
                            <CashFlowTable schedule={analytics.cashFlowSchedule} />
                        </div>
                    ) : (
                        <div className="card empty-state">
                            <div className="empty-state-icon">📊</div>
                            <p className="empty-state-text">
                                Configure the bond parameters and hit calculate to see analytics here.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
