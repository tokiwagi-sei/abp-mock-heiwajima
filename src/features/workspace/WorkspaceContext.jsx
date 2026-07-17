import { createContext, useContext, useMemo, useState } from 'react';
import workspaceData from '../../data/workspace.json';

const WorkspaceContext = createContext(null);

function buildSummary(axis, target) {
  switch (axis) {
    case 'group':
      return 'ボートレース平和島 全体の運営状況を表示しています。';
    case 'org':
      return `${target}の管掌範囲を表示しています。`;
    case 'department':
      return `${target}の業務状況を表示しています。`;
    case 'section':
      return `${target}の業務状況を表示しています。`;
    case 'venue':
      return `${target}の実績を確認しています。`;
    default:
      return 'ボートレース平和島 全体の運営状況を表示しています。';
  }
}

export function WorkspaceProvider({ children }) {
  const [axis, setAxisState] = useState('group');
  const [target, setTarget] = useState(null);

  const axisConfig = workspaceData.axes.find((a) => a.value === axis);

  function setAxis(nextAxis) {
    setAxisState(nextAxis);
    const cfg = workspaceData.axes.find((a) => a.value === nextAxis);
    setTarget(cfg.targets ? cfg.targets[0] : null);
  }

  const summary = useMemo(() => buildSummary(axis, target), [axis, target]);
  const chipLabel = axisConfig?.targets ? `${axisConfig.label}：${target}` : axisConfig?.label;

  const value = {
    workspaceName: workspaceData.workspaceName,
    axes: workspaceData.axes,
    axis,
    axisConfig,
    target,
    setAxis,
    setTarget,
    summary,
    chipLabel,
  };

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const ctx = useContext(WorkspaceContext);
  if (!ctx) throw new Error('useWorkspace must be used within <WorkspaceProvider>');
  return ctx;
}
