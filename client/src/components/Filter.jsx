import React, { useState } from 'react';
import './styles/Filter.scss';

const Filter = ({ options, activeFilters, onFilterChange }) => {
    const [showYearFilter, setShowYearFilter] = useState(false);
    const [showTechFilter, setShowTechFilter] = useState(false);

    const isMultiTechSelected = (activeFilters.technologies?.length || 0) > 1;
    const availableTechs = options.technologies;

    const handleYearChange = (year) => {
        onFilterChange(prev => ({
            ...prev,
            annee: prev.annee === year ? '' : year,
        }));
    };

    const handleTechToggle = (tech) => {
        onFilterChange(prev => {
            const currentTechs = prev.technologies || [];
            const isSelected = currentTechs.includes(tech);

            return {
                ...prev,
                technologies: isSelected
                    ? currentTechs.filter(t => t !== tech)
                    : [...currentTechs, tech],
            };
        });
    };

    const handleToggleYearFilter = (isChecked) => {
        setShowYearFilter(isChecked);
        if (isChecked) {
            setShowTechFilter(false);
            onFilterChange(prev => ({
                ...prev,
                technologies: []
            }));
        } else {
            onFilterChange(prev => ({
                ...prev,
                annee: ''
            }));
        }
    };

    const handleToggleTechFilter = (isChecked) => {
        setShowTechFilter(isChecked);
        if (isChecked) {
            setShowYearFilter(false);
            onFilterChange(prev => ({
                ...prev,
                annee: ''
            }));
        } else {
            onFilterChange(prev => ({
                ...prev,
                technologies: []
            }));
        }
    };

    return (
        <div className="filter">
            <div className="filterSelector">
                <label className="filterCheckbox">
                    <input
                        type="checkbox"
                        checked={showYearFilter}
                        onChange={(e) => handleToggleYearFilter(e.target.checked)}
                    />
                    <span>Filtrer par Année</span>
                </label>

                <label className="filterCheckbox">
                    <input
                        type="checkbox"
                        checked={showTechFilter}
                        onChange={(e) => handleToggleTechFilter(e.target.checked)}
                    />
                    <span>Filtrer par Technologies</span>
                </label>
            </div>

            {(showYearFilter || showTechFilter) && (
                <div className="filterBox">
                    {showYearFilter && (
                        <div className="filterSection yearFilter">
                            <h4>Années</h4>
                            <div className="filterOptions">
                                {options.annees.map(annee => (
                                    <button
                                        key={annee}
                                        className={`filterBtn ${activeFilters.annee === annee ? 'active' : ''}`}
                                        onClick={() => handleYearChange(annee)}
                                    >
                                        {annee}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {showTechFilter && (
                        <div className="filterSection techFilter">
                            <h4>Technologies {isMultiTechSelected && <span style={{ color: '#007bff' }}>(OU)</span>}</h4>

                            <div className="filterOptions">
                                {[...new Set(availableTechs)].sort().map(tech => (
                                    <button
                                        key={tech}
                                        className={`filterBtn ${activeFilters.technologies?.includes(tech) ? 'active' : ''}`}
                                        onClick={() => handleTechToggle(tech)}
                                    >
                                        {tech}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Filter;