import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { FormattedCurrency } from "vtex.format-currency";
import {
  Button,
  Input,
  Table,
  DatePicker,
  ButtonWithIcon,
  ActionMenu,
  Modal
} from "vtex.styleguide";
import styles from "../../styles.css";
import { beautifyDate, filterDate } from "../../common/utils";

const initialFilters = {
  orderId: "",
  returnId: "",
  dateSubmitted: "",
  status: ""
};

const tableLength = 15;

class ReturnsTableContent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      orderedItems: [],
      returns: [],
      slicedData: [],
      error: "",
      paging: {
        total: 0,
        currentPage: 1,
        perPage: tableLength,
        currentFrom: 1,
        currentTo: tableLength
      },
      filters: initialFilters,
      emptyStateLabel: "Nothing to show",
      async: [],
      tableIsLoading: true,
      isFiltered: false,
      dataSort: {
        sortedBy: null,
        sortOrder: null
      },
      isModalOpen: false,
      selectedRequestProducts: []
    };

    this.sortOrderIdASC = this.sortOrderIdASC.bind(this);
    this.sortOrderIdDESC = this.sortOrderIdDESC.bind(this);
    this.sortRequestIdASC = this.sortRequestIdASC.bind(this);
    this.sortRequestIdDESC = this.sortRequestIdDESC.bind(this);
    this.sortDateSubmittedASC = this.sortDateSubmittedASC.bind(this);
    this.sortDateSubmittedDESC = this.sortDateSubmittedDESC.bind(this);
    this.sortStatusASC = this.sortStatusASC.bind(this);
    this.sortStatusDESC = this.sortStatusDESC.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
  }

  handleModalToggle() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  sortOrderIdASC(a, b) {
    return a.orderId < b.orderId ? -1 : a.orderId > b.orderId ? 1 : 0;
  }
  sortOrderIdDESC(a, b) {
    return a.orderId < b.orderId ? 1 : a.orderId > b.orderId ? -1 : 0;
  }

  sortRequestIdASC(a, b) {
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  }
  sortRequestIdDESC(a, b) {
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
  }
  sortDateSubmittedASC(a, b) {
    return a.dateSubmitted < b.dateSubmitted
      ? -1
      : a.dateSubmitted > b.dateSubmitted
      ? 1
      : 0;
  }
  sortDateSubmittedDESC(a, b) {
    return a.dateSubmitted < b.dateSubmitted
      ? 1
      : a.dateSubmitted > b.dateSubmitted
      ? -1
      : 0;
  }
  sortStatusASC(a, b) {
    return a.status < b.status ? -1 : a.status > b.status ? 1 : 0;
  }
  sortStatusDESC(a, b) {
    return a.status < b.status ? 1 : a.status > b.status ? -1 : 0;
  }

  handleSort({ sortOrder, sortedBy }) {
    const { returns } = this.state;
    let slicedData = [];
    if (sortedBy === "orderId") {
      slicedData =
        sortOrder === "ASC"
          ? returns.slice().sort(this.sortOrderIdASC)
          : returns.slice().sort(this.sortOrderIdDESC);
    }
    if (sortedBy === "id") {
      slicedData =
        sortOrder === "ASC"
          ? returns.slice().sort(this.sortRequestIdASC)
          : returns.slice().sort(this.sortRequestIdDESC);
    }

    if (sortedBy === "dateSubmitted") {
      slicedData =
        sortOrder === "ASC"
          ? returns.slice().sort(this.sortDateSubmittedASC)
          : returns.slice().sort(this.sortDateSubmittedDESC);
    }
    if (sortedBy === "status") {
      slicedData =
        sortOrder === "ASC"
          ? returns.slice().sort(this.sortStatusASC)
          : returns.slice().sort(this.sortStatusDESC);
    }

    this.setState({
      slicedData,
      dataSort: {
        sortedBy,
        sortOrder
      }
    });
  }

  hasFiltersApplied() {
    return this.state.isFiltered;
  }

  componentDidMount() {
    this.getRequests();
  }

  getRequests() {
    const { filters } = this.state;
    let where = "";
    if (filters === initialFilters) {
      this.setState({ isFiltered: false });
      where = "1";
    } else {
      this.setState({ isFiltered: true });
    }

    if (filters.orderId !== "") {
      where += 'orderId="' + filters.orderId + '"';
    }

    if (filters.returnId !== "") {
      where += '__id="' + filters.returnId + '"';
    }

    if (filters.dateSubmitted !== "") {
      where += '__dateSubmitted="' + filterDate(filters.dateSubmitted) + '"';
    }

    if (filters.status !== "") {
      where += '__status="' + filters.status + '"';
    }

    if (where.startsWith("__")) {
      where = where.substring(2);
    }
    fetch("/returns/getDocuments/returnRequests/request/" + where, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(returns => {
        this.setState(prevState => ({
          returns: returns,
          orderedItems: returns,
          slicedData: returns.slice(0, tableLength),
          tableIsLoading: false,
          paging: {
            ...prevState.paging,
            currentPage: 1,
            currentTo: tableLength,
            currentFrom: 1,
            total: returns.length
          }
        }));
      })
      .catch(err => this.setState({ error: err }));
  }

  getTableSchema() {
    return {
      properties: {
        id: {
          title: "Return id",
          sortable: true
        },
        orderId: {
          title: "Order id",
          sortable: true
        },
        dateSubmitted: {
          title: "Request Date",
          cellRenderer: ({ cellData }) => {
            return beautifyDate(cellData);
          },
          sortable: true
        },
        status: {
          title: "Status",
          sortable: true
        },
        actions: {
          title: "View",
          cellRenderer: ({ rowData }) => {
            return (
              <Button
                onClick={() => {
                  window.location.href = "/admin/returns/details/" + rowData.id;
                }}
              >
                <FormattedMessage id={"admin/returns.view"} />
              </Button>
            );
          }
        }
      }
    };
  }

  filterStatus(status: string) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        status: status
      }
    }));
  }

  filterReturnId(val: string) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        returnId: val
      }
    }));
  }

  filterOrderId(val: string) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        orderId: val
      }
    }));
  }

  filterDateSubmitted(val: string) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        dateSubmitted: val
      }
    }));
  }

  handleApplyFilters() {
    const { filters } = this.state;
    if (
      filters.dateSubmitted === "" &&
      filters.orderId === "" &&
      filters.returnId === "" &&
      filters.status === ""
    ) {
      this.handleResetFilters();
    } else {
      this.getRequests();
    }
  }

  handleResetFilters() {
    this.setState(
      {
        filters: initialFilters,
        tableIsLoading: true,
        isFiltered: false
      },
      this.getRequests
    );
  }

  handleNextClick() {
    const { paging, orderedItems } = this.state;
    const newPage = paging.currentPage + 1;
    const itemFrom = paging.currentTo + 1;
    const itemTo = paging.perPage * newPage;
    const data = orderedItems.slice(itemFrom - 1, itemTo);
    this.goToPage(newPage, itemFrom, itemTo, data);
  }

  handlePrevClick() {
    const { paging, orderedItems } = this.state;
    if (paging.currentPage === 0) return;
    const newPage = paging.currentPage - 1;
    const itemFrom = paging.currentFrom - paging.perPage;
    const itemTo = paging.currentFrom - 1;
    const data = orderedItems.slice(itemFrom - 1, itemTo);
    this.goToPage(newPage, itemFrom, itemTo, data);
  }

  goToPage(currentPage, currentItemFrom, currentItemTo, slicedData) {
    this.setState(prevState => ({
      paging: {
        ...prevState.paging,
        currentPage: currentPage,
        currentFrom: currentItemFrom,
        currentTo: currentItemTo
      },
      slicedData
    }));
  }

  handleViewRequest(requestId: string) {
    fetch(
      "/returns/getDocuments/returnProducts/product/refundId=" + requestId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(products => {
        this.setState({ selectedRequestProducts: products });
        this.handleModalToggle();
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    const {
      error,
      paging,
      tableIsLoading,
      filters,
      slicedData,
      selectedRequestProducts
    } = this.state;
    const statusLabel = filters.status !== "" ? filters.status : "All statuses";
    let resetFilterButton;
    if (this.hasFiltersApplied()) {
      resetFilterButton = (
        <ButtonWithIcon
          variation="secondary"
          size="small"
          onClick={() => this.handleResetFilters()}
        >
          <FormattedMessage id={"admin/returns.clearFilters"} />
        </ButtonWithIcon>
      );
    }

    if (error) {
      return (
        <div>
          <p className={`center`}>{error}</p>
        </div>
      );
    }
    return (
      <div>
        <div className="ma3">{resetFilterButton}</div>
        <div className="flex items-center">
          <div className={"ma2"}>
            <FormattedMessage id={"admin/returns.requestId"}>
              {msg => (
                <Input
                  placeholder={msg}
                  size={"small"}
                  onChange={e => this.filterReturnId(e.target.value)}
                  value={filters.returnId}
                />
              )}
            </FormattedMessage>
          </div>
          <div className={"ma2"}>
            <FormattedMessage id={"admin/returns.orderId"}>
              {msg => (
                <Input
                  placeholder={msg}
                  size={"small"}
                  onChange={e => this.filterOrderId(e.target.value)}
                  value={filters.orderId}
                />
              )}
            </FormattedMessage>
          </div>
          <div className={"ma2"}>
            <FormattedMessage id={"admin/returns.submittedDate"}>
              {msg => (
                <DatePicker
                  placeholder={msg}
                  locale={"en-GB"}
                  size={"small"}
                  onChange={value => this.filterDateSubmitted(value)}
                  value={filters.dateSubmitted}
                />
              )}
            </FormattedMessage>
          </div>
          <div className="ma2">
            <ActionMenu
              label={statusLabel}
              align="right"
              buttonProps={{
                variation: "secondary",
                size: "small"
              }}
              options={[
                {
                  label: <FormattedMessage id="admin/returns.allStatuses" />,
                  onClick: () => this.filterStatus("")
                },
                {
                  label: <FormattedMessage id="admin/returns.statusNew" />,
                  onClick: () => this.filterStatus("New")
                },
                {
                  label: <FormattedMessage id="admin/returns.statusApproved" />,
                  onClick: () => this.filterStatus("Approved")
                },
                {
                  label: <FormattedMessage id="admin/returns.statusPending" />,
                  onClick: () => this.filterStatus("Pending verification")
                },
                {
                  label: (
                    <FormattedMessage id="admin/returns.statusPartiallyApproved" />
                  ),
                  onClick: () => this.filterStatus("Partially approved")
                },
                {
                  label: <FormattedMessage id="admin/returns.statusDenied" />,
                  onClick: () => this.filterStatus("Denied")
                }
              ]}
            />
          </div>
          <div className={"ma2"}>
            <Button size={"small"} onClick={() => this.handleApplyFilters()}>
              <FormattedMessage id={"admin/returns.filterResults"} />
            </Button>
          </div>
        </div>
        <Table
          fullWidth
          loading={tableIsLoading}
          items={slicedData}
          schema={this.getTableSchema()}
          onRowClick={({ rowData }) => {
            this.handleViewRequest(rowData.id);
          }}
          pagination={{
            onNextClick: this.handleNextClick,
            onPrevClick: this.handlePrevClick,
            textShowRows: "Show rows",
            textOf: "of",
            currentItemFrom: paging.currentFrom,
            currentItemTo: paging.currentTo,
            totalItems: paging.total
          }}
          sort={{
            sortedBy: this.state.dataSort.sortedBy,
            sortOrder: this.state.dataSort.sortOrder
          }}
          onSort={this.handleSort}
        />
        <Modal
          centered
          isOpen={this.state.isModalOpen}
          onClose={this.handleModalToggle}
        >
          <div className="dark-gray">
            {selectedRequestProducts.length ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Sku ID</th>
                    <th>Sku Name</th>
                    <th>Unit price</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRequestProducts.map((product: any) => (
                    <tr key={product.skuId}>
                      <td>{product.skuId}</td>
                      <td>{product.skuName}</td>
                      <td>
                        <FormattedCurrency value={product.unitPrice / 100} />
                      </td>
                      <td>{product.quantity}</td>
                      <td>
                        <FormattedCurrency value={product.totalPrice / 100} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReturnsTableContent;