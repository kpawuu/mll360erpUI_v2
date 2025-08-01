import feathersClient from "../feathers.ts";

export interface DashboardMetrics {
  totalRevenue: number;
  totalCustomers: number;
  conversionRate: number;
  activeDeals: number;
  totalPipeline: number;
  winRate: number;
  avgDealSize: number;
  salesCycle: number;
}

export interface PipelineStage {
  name: string;
  deals: number;
  value: number;
  color: string;
  conversionRate: number;
  percentage: number;
}

export interface DashboardData {
  metrics: DashboardMetrics;
  pipeline: {
    totalValue: number;
    stages: PipelineStage[];
  };
  recentOpportunities: any[];
  activities: any[];
}

// Dashboard service for fetching dashboard data
export const dashboardService = {
  // Get dashboard metrics
  async getMetrics(): Promise<DashboardMetrics> {
    try {
      // For now, return mock data until backend endpoints are created
      return {
        totalRevenue: 86589,
        totalCustomers: 2340,
        conversionRate: 18.2,
        activeDeals: 36,
        totalPipeline: 3000000,
        winRate: 24,
        avgDealSize: 250000,
        salesCycle: 45
      };
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      throw error;
    }
  },

  // Get pipeline data
  async getPipeline(): Promise<{ totalValue: number; stages: PipelineStage[] }> {
    try {
      return {
        totalValue: 3000000,
        stages: [
          { name: 'Qualification', deals: 5, value: 350000, color: 'blue', conversionRate: 78, percentage: 20 },
          { name: 'Discovery', deals: 7, value: 550000, color: 'indigo', conversionRate: 65, percentage: 32 },
          { name: 'Proposal', deals: 6, value: 750000, color: 'purple', conversionRate: 45, percentage: 43 },
          { name: 'Negotiation', deals: 3, value: 450000, color: 'orange', conversionRate: 72, percentage: 26 },
          { name: 'Closed Won', deals: 3, value: 900000, color: 'green', conversionRate: 100, percentage: 30 }
        ]
      };
    } catch (error) {
      console.error('Error fetching pipeline data:', error);
      throw error;
    }
  },

  // Get recent opportunities
  async getRecentOpportunities(): Promise<any[]> {
    try {
      return [
        {
          id: 1,
          name: 'TechnoGlobal Expansion',
          company: 'TechnoGlobal Inc.',
          stage: 'Proposal',
          value: 2500000,
          color: 'blue'
        },
        {
          id: 2,
          name: 'NexGen Supply Chain',
          company: 'NexGen Robotics',
          stage: 'Discovery',
          value: 450000,
          color: 'indigo'
        },
        {
          id: 3,
          name: 'GlobalTech Integration',
          company: 'GlobalTech Solutions',
          stage: 'Closed Won',
          value: 1200000,
          color: 'green'
        }
      ];
    } catch (error) {
      console.error('Error fetching recent opportunities:', error);
      throw error;
    }
  },

  // Get recent activities
  async getRecentActivities(): Promise<any[]> {
    try {
      return [
        {
          id: 1,
          type: 'deal_created',
          message: 'New deal created: TechnoGlobal Expansion',
          time: '2 hours ago',
          icon: 'plus',
          color: 'blue'
        },
        {
          id: 2,
          type: 'deal_closed',
          message: 'Deal closed: GlobalTech Integration ($1.2M)',
          time: '4 hours ago',
          icon: 'check',
          color: 'green'
        },
        {
          id: 3,
          type: 'meeting',
          message: 'Meeting scheduled: NexGen Robotics follow-up',
          time: '1 day ago',
          icon: 'chat',
          color: 'purple'
        }
      ];
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      throw error;
    }
  },

  // Get complete dashboard data
  async getDashboardData(): Promise<DashboardData> {
    try {
      const [metrics, pipeline, opportunities, activities] = await Promise.all([
        this.getMetrics(),
        this.getPipeline(),
        this.getRecentOpportunities(),
        this.getRecentActivities()
      ]);

      return {
        metrics,
        pipeline,
        recentOpportunities: opportunities,
        activities
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
}; 