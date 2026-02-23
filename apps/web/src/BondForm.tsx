import React, { useState } from 'react';
import type { BondParameters } from './types.js';

interface BondFormProps {
    onSubmit: (params: BondParameters) => void;
    isLoading: boolean;
}

export const BondForm: React.FC<BondFormProps> = ({ onSubmit, isLoading }) => {
    const [params, setParams] = useState<BondParameters>({
        faceValue: 1000,
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        couponFrequency: 2,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setParams((prev) => ({
            ...prev,
            [name]: name === 'couponFrequency' ? parseInt(value, 10) : parseFloat(value),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(params);
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
                <label className="form-label" htmlFor="faceValue">Face Value ($)</label>
                <input className="form-input" type="number" id="faceValue" name="faceValue" value={params.faceValue} onChange={handleChange} required min="0.01" step="0.01" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="annualCouponRate">Annual Coupon Rate (%)</label>
                <input className="form-input" type="number" id="annualCouponRate" name="annualCouponRate" value={params.annualCouponRate} onChange={handleChange} required min="0" max="100" step="0.01" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="marketPrice">Market Price ($)</label>
                <input className="form-input" type="number" id="marketPrice" name="marketPrice" value={params.marketPrice} onChange={handleChange} required min="0.01" step="0.01" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="yearsToMaturity">Years to Maturity</label>
                <input className="form-input" type="number" id="yearsToMaturity" name="yearsToMaturity" value={params.yearsToMaturity} onChange={handleChange} required min="0.01" step="0.01" />
            </div>

            <div className="form-group">
                <label className="form-label" htmlFor="couponFrequency">Coupon Frequency</label>
                <select className="form-select" id="couponFrequency" name="couponFrequency" value={params.couponFrequency} onChange={handleChange}>
                    <option value={1}>Annual (1)</option>
                    <option value={2}>Semiannual (2)</option>
                </select>
            </div>

            <button type="submit" disabled={isLoading} className="btn">
                {isLoading ? <><span className="spinner" />Calculating…</> : 'Calculate Analytics'}
            </button>
        </form>
    );
};
