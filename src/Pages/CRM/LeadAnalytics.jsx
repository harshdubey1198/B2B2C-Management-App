import React, { useEffect, useState } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import Chart from "react-apexcharts";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { getAllLeads } from "../../apiServices/service";

function LeadAnalytics() {
    const [leadData, setLeadData] = useState([]);
    const [statusData, setStatusData] = useState([]);
    const [barChartData, setBarChartData] = useState([]);

    const fetchLeads = async () => {
        try {
            const result = await getAllLeads();
            const leads = result?.data?.leads || [];
            setLeadData(leads);

            const statusCount = leads.reduce((acc, lead) => {
                acc[lead.status] = (acc[lead.status] || 0) + 1;
                return acc;
            }, {});

            setStatusData(
                Object.keys(statusCount).map((status) => ({
                    name: status,
                    value: statusCount[status],
                }))
            );

            setBarChartData(
                Object.keys(statusCount).map((status) => ({
                    x: status,
                    y: statusCount[status],
                }))
            );
        } catch (error) {
            console.error("Error fetching leads:", error.message);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);
    const [totalLeads, setTotalLeads] = useState(0);

    useEffect(() => {
        setTotalLeads(leadData.length);
    }, [leadData]);

    const pieChartOptions = {
        chart: {
            type: "pie",
        },
        labels: statusData.map((data) => data.name),
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    const pieChartSeries = statusData.map((data) => data.value);

    const barChartOptions = {
        chart: {
            type: "bar",
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "50%",
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: barChartData.map((data) => data.x),
        },
    };

    const barChartSeries = [
        {
            name: "Leads",
            data: barChartData.map((data) => data.y),
        },
    ];

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="CRM" breadcrumbItem="Lead Analytics" />
                <span className="text-muted">
                    Total Leads: <strong>{totalLeads}</strong>
                </span>
                <Row>
                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title">Leads by Status (Pie Chart)</h4>
                                <Chart
                                    options={pieChartOptions}
                                    series={pieChartSeries}
                                    type="pie"
                                    width="100%"
                                />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card>
                            <CardBody>
                                <h4 className="card-title">Leads by Status (Bar Chart)</h4>
                                <Chart
                                    options={barChartOptions}
                                    series={barChartSeries}
                                    type="bar"
                                    height={350}
                                />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}

export default LeadAnalytics;
