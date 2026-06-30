# Chart.svelte Architecture and Data Flow

```mermaid
graph TD
    A["Chart.svelte<br/>(Orchestrator)"]
    
    A -->|receives| B["dataset prop<br/>e.g., 'births'"]
    
    A -->|looks up config| C["chartOptions.ts<br/>(Configuration Registry)"]
    C -->|returns| D["Chart rendering rules<br/>e.g., chartType, axes,<br/>projectedStart date"]
    
    A -->|fetches data| E["utils.ts<br/>(Data Loader)"]
    E -->|imports| F["projectedPopulationChartData.json<br/>(Bundled Local JSON)"]
    E -->|imports| G["ComponentsOfChangeChartData.json<br/>(Bundled Local JSON)"]
    E -->|fallback to| H["API<br/>/api/chartData"]
    E -->|returns filtered rows| I["Chart data<br/>e.g., dataset='births'<br/>filtered rows"]
    
    A -->|uses config + data| J["Chart Type Builder<br/>lineChart.ts, barChart.ts, etc."]
    J -->|uses config| D
    J -->|accesses| I
    J -->|builds spec| K["Observable Plot Spec<br/>marks, axes, scales"]
    
    A -->|creates color scale| L["getColorScale function<br/>series → color mapping"]
    L -->|uses| I
    L -->|feeds into| K
    
    A -->|renders| M["ObservablePlot Component<br/>Browser canvas"]
    M -->|displays| K
    
    style A fill:#4A90E2,color:#fff,stroke:#005080,stroke-width:3px
    style C fill:#50C878,color:#fff
    style E fill:#FFB500,color:#000
    style J fill:#FF6B6B,color:#fff
    style M fill:#9B59B6,color:#fff
    style D fill:#50C878,color:#fff
    style I fill:#FFB500,color:#000
    style K fill:#FF6B6B,color:#fff
```

## How it Works:

1. **Chart.svelte (blue center)** receives a `dataset` prop (like `"births"`)
2. **Looks up config** in `chartOptions.ts` to get rendering rules (chart type, axes, projected start date)
3. **Fetches data** via `utils.ts` which:
   - Checks bundled JSON files first (local-first)
   - Falls back to API if dataset not found locally
   - Returns filtered rows for that specific dataset
4. **Constructs visualization** using the appropriate chart builder (lineChart.ts, barChart.ts, etc.)
5. **Creates color scale** mapping series names to colors
6. **Builds Observable Plot spec** combining all the marks, axes, and scales
7. **Renders to browser** via ObservablePlot component
