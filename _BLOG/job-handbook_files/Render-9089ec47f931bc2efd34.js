(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    "2A6Q": function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = (s("q1tI"), s("pqiZ")),
        r = s("8fuX"),
        n = s("wldR");
      class d extends n.a {
        static renderDivider() {
          return a()(o.a, { size: 37 });
        }
        renderComponent() {
          const { device: e } = this.environment,
            { children: t, controlRow: s } = this.props,
            i = () => (e.isMobile ? 18 : 60),
            o = () => (e.isMobile ? 18 : 36);
          return this.props.disableScroller
            ? a()(
                "div",
                { style: { paddingLeft: i(), paddingRight: i() } },
                void 0,
                a()(
                  "div",
                  { style: { paddingTop: o(), paddingBottom: o() } },
                  void 0,
                  t
                ),
                s &&
                  a()(
                    "div",
                    {
                      style: {
                        paddingTop: 16,
                        paddingBottom: 16,
                        boxShadow: "0 -1px 0 ".concat(
                          this.theme.regularDividerColor
                        ),
                      },
                    },
                    void 0,
                    s
                  )
              )
            : a()(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    backgroundColor: this.theme.contentBackground,
                  },
                },
                void 0,
                a()(
                  r.b,
                  {
                    type: r.a.All,
                    style: {
                      flexGrow: 1,
                      WebkitOverflowScrolling: "touch",
                      transform: "translateZ(0)",
                      paddingLeft: i(),
                      paddingRight: i(),
                      paddingTop: o(),
                      paddingBottom: o(),
                    },
                  },
                  void 0,
                  t
                ),
                s &&
                  a()(
                    "div",
                    {
                      style: {
                        flexGrow: 0,
                        flexShrink: 0,
                        paddingLeft: i(),
                        paddingRight: i(),
                        paddingTop: 16,
                        paddingBottom: 16,
                        boxShadow: "0 -1px 0 ".concat(
                          this.theme.regularDividerColor
                        ),
                      },
                    },
                    void 0,
                    s
                  )
              );
        }
      }
      t.a = d;
    },
    "3wHm": function (e, t, s) {
      "use strict";
      var i = s("pVnL"),
        a = s.n(i),
        o = s("gcR/"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("LvDl")),
        p = s.n(l),
        u = s("q1tI"),
        c = s.n(u),
        m = s("vDOa"),
        g = s("5/h/"),
        h = s("Mr7a"),
        b = s("SAEH"),
        S = s("mjq6"),
        v = s("gyBu"),
        f = s("tvfY"),
        M = s("wldR"),
        y = s("pqiZ"),
        w = s("H4VD"),
        P = s("wpmu"),
        C = s("g4rC"),
        k = s("i3uR"),
        T = s("WgIs"),
        I = s("gbGO"),
        B = s("sbdd"),
        L = s("2Y+N"),
        F = s("zTdN"),
        x = s("VBxf"),
        R = s("bkwR"),
        A = s("nM47"),
        O = s("/YYm"),
        E = s("MBf9"),
        D = s("LeVO"),
        U = s("ZQ9l"),
        G = s("y6Dp"),
        N = s("hvW1"),
        V = s("IULH"),
        j = s("d9nj"),
        q = s("mF3+"),
        H = s("Cycz"),
        _ = s("r8MX"),
        z = s("J9+s"),
        W = s("HRSx");
      const Y = Object(z.defineMessages)({
        removingGuest: {
          id: "guestPagesPopup.removeGuest.updatingMessage",
          defaultMessage: "Updating…",
        },
        addingMember: {
          id: "guestPagesPopup.addMemberPermission.updatingMessage",
          defaultMessage: "Updating…",
        },
      });
      class Q extends M.a {
        constructor(...e) {
          super(...e),
            d()(this, "storeTypes", { buttonPopupStore: C.a }),
            d()(this, "renderPopup", () => {
              const { device: e } = this.environment,
                { store: t, guest: s } = this.props,
                i = t.canAdmin(),
                o = s.guestPageIds.map((e) => {
                  const s = P.a.createChildStore(t, { table: W.a, id: e });
                  return {
                    key: e,
                    render: (e) =>
                      c.a.createElement(
                        B.a,
                        a()({}, e, {
                          store: s,
                          placeholder: r()(z.FormattedMessage, {
                            id: "guestPagesPopup.privatePagePlaceholder",
                            defaultMessage: "Private page",
                          }),
                        })
                      ),
                    action: () => {
                      const s = P.a.createChildStore(t, { table: W.a, id: e }),
                        i = Object(O.a)({ store: s, fullyQualified: !1 });
                      w.navigate({
                        environment: this.environment,
                        url: i,
                        metaClick: !0,
                      });
                    },
                  };
                });
              let n, d;
              return (
                (n = e.isMobile
                  ? { menuType: I.b.MenuType.ActionSheet }
                  : { menuType: I.b.MenuType.Popup, width: 300 }),
                Object(H.J)(this.environment) &&
                  (d = r()(D.a, {
                    renderTooltip: () =>
                      this.isSubscribed()
                        ? r()(z.FormattedMessage, {
                            id: "guestPagesPopup.addMemberPermissionButton.tooltip",
                            defaultMessage:
                              "This guest will become a member of this workspace.",
                          })
                        : r()(z.FormattedMessage, {
                            id: "guestPagesPopup.addAdminPermissionButton.tooltip",
                            defaultMessage:
                              "This guest will become an admin of this workspace.",
                          }),
                    render: (e) =>
                      c.a.createElement(
                        V.a,
                        a()(
                          {
                            isLarge: !0,
                            onClick: this.handleConvertToMemberClick,
                          },
                          e
                        ),
                        this.isSubscribed()
                          ? r()(z.FormattedMessage, {
                              id: "guestPagesPopup.addMemberPermissionButton.label",
                              defaultMessage: "Convert to member",
                            })
                          : r()(z.FormattedMessage, {
                              id: "guestPagesPopup.addAdminPermissionButton.label",
                              defaultMessage: "Convert to admin",
                            })
                      ),
                  })),
                c.a.createElement(
                  I.b,
                  n,
                  i &&
                    r()(U.a, {
                      title: r()(
                        "div",
                        {
                          style: {
                            paddingTop: 12,
                            paddingBottom: 8,
                            display: "flex",
                            alignItems: "flex-start",
                          },
                        },
                        void 0,
                        d,
                        r()(D.a, {
                          renderTooltip: () =>
                            r()(z.FormattedMessage, {
                              id: "guestPagesPopup.removeGuestButton.tooltip",
                              defaultMessage:
                                "This guest will be removed from all pages in this Workspace.",
                            }),
                          render: (e) =>
                            c.a.createElement(
                              V.a,
                              a()(
                                {
                                  isLarge: !0,
                                  isRed: !0,
                                  style: { marginLeft: d ? 8 : 0 },
                                  onClick: this.handleRemoveClick,
                                },
                                e
                              ),
                              r()(z.FormattedMessage, {
                                id: "guestPagesPopup.removeGuestButton.label",
                                defaultMessage: "Remove",
                              })
                            ),
                        })
                      ),
                    }),
                  i &&
                    r()(F.a, {
                      title: r()(z.FormattedMessage, {
                        id: "guestPagesPopup.guestAccessiblePagesCaption",
                        defaultMessage: "This guest can access these pages",
                      }),
                    }),
                  r()(T.a, {
                    type: T.a.Type.Vertical,
                    initialFocus: 0,
                    sections: [
                      {
                        key: "pages",
                        render: (e) => c.a.createElement(L.a, e),
                        items: o,
                      },
                    ],
                  })
                )
              );
            }),
            d()(this, "handleRemoveClick", () => {
              x.showDialog({
                showCancel: !0,
                keepFocus: !1,
                message: r()(z.FormattedMessage, {
                  id: "guestPagesPopup.removeGuestModal.confirmationMessage",
                  defaultMessage:
                    "Are you sure you want to remove this person? They will lose access to all shared pages.",
                }),
                items: [
                  {
                    label: r()(z.FormattedMessage, {
                      id: "guestPagesPopup.removeGuestModal.removeButton.label",
                      defaultMessage: "Remove",
                    }),
                    color: "red",
                    onAccept: async () => {
                      const { guest: e, store: t } = this.props;
                      this.stores.buttonPopupStore.setState({
                        ...this.stores.buttonPopupStore.state,
                        open: !1,
                      }),
                        N.b({ message: Y.removingGuest });
                      "success" ===
                        (
                          await R.removeUsersFromSpace(this.environment, {
                            userIds: [e.userId],
                            spaceId: t.id,
                            removePagePermissions: !0,
                            revokeUserTokens: !1,
                          })
                        ).type &&
                        (await A.e(this.environment), G.ee(this.environment)),
                        N.a();
                    },
                  },
                ],
              });
            }),
            d()(this, "handleConvertToMemberClick", async () => {
              const e = E.create(this.environment),
                { store: t, guest: s, isSubscribed: i } = this.props,
                a = h.f({
                  environment: this.environment,
                  store: t,
                  permissionItems: [
                    {
                      type: "user_permission",
                      role: i ? "read_and_write" : "editor",
                      user_id: s.userId,
                    },
                  ],
                  transaction: e,
                });
              E.commit({ environment: this.environment, transaction: e }),
                this.stores.buttonPopupStore.setState({
                  ...this.stores.buttonPopupStore.state,
                  open: !1,
                }),
                N.b({ message: Y.addingMember });
              try {
                await a,
                  await A.e(this.environment),
                  G.bb(this.environment, { member_user_id: s.userId });
              } finally {
                N.a();
              }
            });
        }
        renderComponent() {
          const { device: e } = this.environment,
            { buttonPopupStore: t } = this.stores,
            { store: s, guest: i } = this.props;
          return (
            i.guestPageIds.map((e) => {
              P.a.createChildStore(s, { table: W.a, id: e }).getValue();
            }),
            0 === i.guestPageIds.length
              ? r()(z.FormattedMessage, {
                  id: "guestPagesPopup.permissionsForUserGuest.label",
                  defaultMessage: "Guest",
                })
              : r()(k.a, {
                  popupType: e.isMobile
                    ? k.a.PopupType.SlideUp
                    : k.a.PopupType.Popup,
                  renderOrigin: (e) =>
                    c.a.createElement(
                      j.a,
                      e,
                      r()(z.FormattedMessage, {
                        id: "guestPagesButton.label",
                        defaultMessage:
                          "{numberOfAccessiblePages, plural, one {{numberOfAccessiblePages} page} other {{numberOfAccessiblePages} pages}}",
                        values: {
                          numberOfAccessiblePages: i.guestPageIds.length,
                        },
                      }),
                      q.a.chevronDown({
                        width: 10,
                        marginLeft: 4,
                        fill: this.theme.lightIconColor,
                      })
                    ),
                  buttonPopupStore: t,
                  render: this.renderPopup,
                })
          );
        }
        isSubscribed() {
          const { data: e } = _.default.state;
          return Boolean(e && Object(H.D)(e));
        }
      }
      var Z = Object(z.injectIntl)(Q),
        J = s("yNyh"),
        X = s("yisX"),
        K = s("2A6Q"),
        $ = s("bAi4"),
        ee = s("R+Q+"),
        te = s("FUUC"),
        se = s("GojS"),
        ie = s("Oy36"),
        ae = s("LEzx");
      class oe extends ae.a {
        getInitialState() {
          return { userInputValue: "", temporaryUserIds: [], limitUsers: !0 };
        }
      }
      var re = oe,
        ne = s("wXH4"),
        de = s("ox2z"),
        le = s("bTAb"),
        pe = s("Pl3d"),
        ue = s("4HCU"),
        ce = s("f0kS"),
        me = s("W3at"),
        ge = s("NOLh"),
        he = s("bFnu"),
        be = s("x4bP"),
        Se = s("EZe4"),
        ve = s("V9q8"),
        fe = s("VyA+"),
        Me = s("meF8"),
        ye = s("Sb6f"),
        we = s("CTEM"),
        Pe = s("iICV"),
        Ce = s("Ng05"),
        ke = s("lCCU"),
        Te = s("WLsh"),
        Ie = s("QcDD"),
        Be = s("JMnu"),
        Le = s("8f5p");
      class Fe extends M.a {
        constructor(...e) {
          super(...e),
            d()(this, "storeTypes", {
              spacePermissionGroupStore: re,
              actionMenuButtonPopupStore: C.a,
              addMemberButtonPopupStore: C.a,
              autocompleteStore: le.a,
              mouseStore: he.a,
            }),
            d()(this, "renderUser", (e) => {
              const { store: t, group: s, disabled: i } = this.props;
              return r()(
                "div",
                { style: { display: "flex", alignItems: "center" } },
                e.id,
                r()(se.a, {
                  userValue: e,
                  style: {
                    paddingRight: 6,
                    minHeight: 34,
                    lineHeight: 1.2,
                    width: "100%",
                  },
                  avatarSize: 24,
                }),
                !i &&
                  r()(
                    j.a,
                    {
                      onClick: async () => {
                        if (
                          await x.confirmUserAction({
                            message: r()(z.FormattedMessage, {
                              id: "spacePermissionsSettings.groupsTab.removeMemberFromGroupDialog.confirmationMessage",
                              defaultMessage:
                                "Are you sure you want to remove this member?",
                            }),
                            acceptLabel: r()(z.FormattedMessage, {
                              id: "spacePermissionsSettings.groupsTab.removeMemberFromGroupDialog.confirmationButton.label",
                              defaultMessage: "Yes",
                            }),
                          })
                        ) {
                          const i = (s.user_ids || []).filter(
                              (t) => t !== e.id
                            ),
                            a = { ...s, user_ids: i };
                          E.createAndCommit(this.environment, (e) => {
                            b.y({ spaceStore: t, group: a, transaction: e });
                          }),
                            G.Pd(this.environment);
                        }
                      },
                    },
                    void 0,
                    r()(z.FormattedMessage, {
                      id: "spacePermissionsSettings.groupsTab.removeMemberFromGroupButton.label",
                      defaultMessage: "Remove",
                    })
                  )
              );
            }),
            d()(this, "renderActionMenu", () => {
              const e = {
                key: "action_menu",
                render: (e) => c.a.createElement(L.a, e),
                items: [
                  {
                    key: "rename",
                    render: (e) =>
                      c.a.createElement(
                        de.a,
                        a()({}, e, {
                          title: r()(z.FormattedMessage, {
                            id: "spacePermissionsSettings.groupsTab.groupList.actionMenu.renameItem",
                            defaultMessage: "Rename",
                          }),
                        })
                      ),
                    action: this.handleRename,
                  },
                  {
                    key: "delete",
                    render: (e) =>
                      c.a.createElement(
                        de.a,
                        a()({}, e, {
                          title: r()(z.FormattedMessage, {
                            id: "spacePermissionsSettings.groupsTab.groupList.actionMenu.deleteItem",
                            defaultMessage: "Delete",
                          }),
                        })
                      ),
                    action: this.handleDelete,
                  },
                ],
              };
              return r()(
                I.b,
                { menuType: I.b.MenuType.Popup },
                void 0,
                r()(T.a, {
                  type: T.a.Type.Vertical,
                  initialFocus: 0,
                  sections: [e],
                  onAccept: () => {
                    this.stores.actionMenuButtonPopupStore.reset();
                  },
                })
              );
            }),
            d()(this, "renderAddMemberMenu", () => {
              const { store: e } = this.props,
                { userInputValue: t, temporaryUserIds: s } =
                  this.stores.spacePermissionGroupStore.state,
                i = {
                  request: {
                    query: t,
                    temporaryUserIds:
                      this.stores.spacePermissionGroupStore.state
                        .temporaryUserIds,
                  },
                  performRequest: async ({ query: e, temporaryUserIds: t }) => {
                    const { group: s } = this.props,
                      i = s.user_ids || [];
                    return (
                      await ue.m({
                        environment: this.environment,
                        query: e,
                        membersOnly: !0,
                      })
                    )
                      .filter((e) => i.indexOf(e.id) < 0 && t.indexOf(e.id) < 0)
                      .slice(0, 20);
                  },
                  render: this.renderAddMemberResults,
                },
                a = s.map((t) => {
                  const i = e.getRecordValue({ table: g.a, id: t });
                  return r()(
                    Be.b,
                    {
                      userValue: i,
                      format: Be.b.Format.Medium,
                      showRemoveButton: !0,
                      onClickRemove: () => {
                        const e = s.filter((e) => e !== t);
                        this.stores.spacePermissionGroupStore.setState({
                          ...this.stores.spacePermissionGroupStore.state,
                          temporaryUserIds: e,
                        });
                      },
                      shouldShrink: !0,
                      isSingle: !1,
                    },
                    t
                  );
                });
              return r()(
                I.b,
                {
                  menuType: I.b.MenuType.Popup,
                  tokenInputHeader: !0,
                  header: r()(me.a, {
                    focus: !0,
                    disabled: !1,
                    focusAfterAnimation: !0,
                    format: me.a.Format.Group,
                    tokens: a,
                    placeholder: this.props.intl.formatMessage({
                      id: "spacePermissionsSettings.groupsTab.userGroup.userSearchInput.placeholder",
                      defaultMessage: "Search for a person…",
                    }),
                    onRemoveLastToken:
                      this.handleTokenInputMenuItemRemoveLastToken,
                    value: t,
                    onChange: this.handleTokenInputMenuItemChange,
                    right: r()(
                      Ce.a,
                      { isLarge: !0, onClick: this.handleAddDoneClick },
                      void 0,
                      r()(z.FormattedMessage, {
                        id: "spacePermissionsSettings.groupsTab.userGroup.addUserButton.label",
                        defaultMessage: "Add",
                      })
                    ),
                  }),
                },
                void 0,
                c.a.createElement(pe.a, i)
              );
            }),
            d()(this, "renderAddMemberResults", (e, t) => {
              const { store: s } = this.props,
                i = t || [],
                { temporaryUserIds: o } =
                  this.stores.spacePermissionGroupStore.state,
                n = i.map(({ id: e }) => e);
              if (0 === n.length)
                return r()(
                  L.a,
                  {},
                  void 0,
                  r()(F.a, {
                    title: r()(z.FormattedMessage, {
                      id: "spacePermissionsSettings.groupsTab.userGroup.searchUserDropdown.noResultsMessage",
                      defaultMessage: "No results",
                    }),
                  })
                );
              {
                const e = {
                  key: "user_menu",
                  render: (e) => c.a.createElement(L.a, e),
                  items: n.map((e) => {
                    const t = f.a
                      .createChildStore(s, { table: g.a, id: e })
                      .getValue();
                    return {
                      key: e,
                      render: (e) =>
                        c.a.createElement(ce.a, a()({}, e, { user: t })),
                      action: () => {
                        const t = [...o, e];
                        this.stores.spacePermissionGroupStore.setState({
                          ...this.stores.spacePermissionGroupStore.state,
                          temporaryUserIds: t,
                          userInputValue: "",
                        });
                      },
                    };
                  }),
                };
                return r()(T.a, {
                  type: T.a.Type.Vertical,
                  initialFocus: 0,
                  sections: [e],
                });
              }
            }),
            d()(this, "handleMouseEnter", (e) => {
              this.stores.mouseStore.setState({
                ...this.stores.mouseStore.state,
                mouseEntered: !0,
              });
            }),
            d()(this, "handleMouseLeave", (e) => {
              this.stores.mouseStore.setState({
                ...this.stores.mouseStore.state,
                mouseEntered: !1,
              });
            }),
            d()(this, "handleMouseDown", (e) => {
              Object(ve.a)(
                e.target,
                (e) =>
                  e && e.classList && e.classList.contains(Fe.dragHandleClass)
              ) || Object(Se.c)(e);
            }),
            d()(this, "handleIconChange", (e) => {
              const { store: t, group: s } = this.props,
                i = { ...s, icon: e };
              E.createAndCommit(this.environment, (e) => {
                b.y({ spaceStore: t, group: i, transaction: e });
              }),
                G.Sd(this.environment, { is_emoji: Object(we.a)(e) });
            }),
            d()(this, "handleRename", () => {
              const { group: e, spacePermissionsSettingsStore: t } = this.props;
              t.setState({
                ...t.state,
                editingNameGroupId: e.id,
                groupNameInputValue: e.name || "",
              }),
                this.stores.actionMenuButtonPopupStore.setState({
                  ...this.stores.actionMenuButtonPopupStore.state,
                  open: !1,
                }),
                G.Qd(this.environment);
            }),
            d()(this, "handleDelete", async () => {
              const { store: e, group: t } = this.props;
              this.stores.actionMenuButtonPopupStore.setState({
                ...this.stores.actionMenuButtonPopupStore.state,
                open: !1,
              });
              if (
                await x.confirmUserAction({
                  message: r()(z.FormattedMessage, {
                    id: "spacePermissionsSettings.groupsTab.deleteGroupModal.confirmationMessage",
                    defaultMessage:
                      "Are you sure you want to delete this group? Any pages that are private to this group will be transferred to you.",
                  }),
                  acceptLabel: r()(z.FormattedMessage, {
                    id: "spacePermissionsSettings.groupsTab.deleteGroupModal.confirmationButton.label",
                    defaultMessage: "Yes",
                  }),
                })
              ) {
                const s = E.create(this.environment);
                await b.i({
                  environment: this.environment,
                  spaceStore: e,
                  group: t,
                  transaction: s,
                }),
                  E.commit({ environment: this.environment, transaction: s }),
                  G.Od(this.environment);
              }
            }),
            d()(this, "handleNameChange", (e) => {
              this.props.spacePermissionsSettingsStore.setState({
                ...this.props.spacePermissionsSettingsStore.state,
                groupNameInputValue: e,
              });
            }),
            d()(this, "handleNameCancel", () => {
              const { spacePermissionsSettingsStore: e } = this.props;
              e.setState({
                ...e.state,
                editingNameGroupId: void 0,
                groupNameInputValue: "",
              });
            }),
            d()(this, "handleNameAccept", () => {
              const {
                  store: e,
                  group: t,
                  spacePermissionsSettingsStore: s,
                } = this.props,
                { editingNameGroupId: i, groupNameInputValue: a } = s.state;
              if (i === t.id) {
                if (a !== t.name) {
                  const s = { ...t, name: a };
                  E.createAndCommit(this.environment, (t) => {
                    b.y({ spaceStore: e, group: s, transaction: t });
                  });
                }
                s.setState({
                  ...s.state,
                  editingNameGroupId: void 0,
                  groupNameInputValue: "",
                });
              }
            }),
            d()(this, "handleTokenInputMenuItemRemoveLastToken", () => {
              const { temporaryUserIds: e } =
                  this.stores.spacePermissionGroupStore.state,
                t = e.slice(0, e.length - 1);
              this.stores.spacePermissionGroupStore.setState({
                ...this.stores.spacePermissionGroupStore.state,
                temporaryUserIds: t,
              });
            }),
            d()(this, "handleTokenInputMenuItemChange", (e) => {
              const t = e.target.value,
                { spacePermissionGroupStore: s } = this.stores,
                { extractedEmails: i, newInputValue: a } = Object(Te.a)(t),
                { currentSpaceStore: o } = Ie.default.state,
                { data: r } = _.default.state;
              if (!r || !o) return;
              const n = Object(H.v)(r).map((e) => e.userId),
                d = p.a
                  .compact(
                    n.map((e) =>
                      f.a.createChildStore(o, { table: g.a, id: e }).getValue()
                    )
                  )
                  .filter(
                    (e) =>
                      i.includes(e.email) &&
                      !s.state.temporaryUserIds.includes(e.id)
                  );
              s.setState({
                ...s.state,
                temporaryUserIds: [
                  ...s.state.temporaryUserIds,
                  ...d.map((e) => e.id),
                ],
                userInputValue: a,
              });
            }),
            d()(this, "handleAddDoneClick", () => {
              const { store: e, group: t } = this.props,
                { temporaryUserIds: s } =
                  this.stores.spacePermissionGroupStore.state,
                i = t.user_ids || [],
                a = p.a.union(i, s),
                o = { ...t, user_ids: a };
              E.createAndCommit(this.environment, (t) => {
                b.y({ spaceStore: e, group: o, transaction: t });
              }),
                this.stores.spacePermissionGroupStore.reset(),
                this.stores.addMemberButtonPopupStore.setState({
                  ...this.stores.addMemberButtonPopupStore.state,
                  open: !1,
                }),
                G.Md(this.environment, { add_member_count: s.length });
            }),
            d()(this, "handleAddMemberButtonPopupClose", () => {
              this.stores.spacePermissionGroupStore.reset();
            }),
            d()(this, "handleShowMoreClick", () => {
              this.stores.spacePermissionGroupStore.setState({
                ...this.stores.spacePermissionGroupStore.state,
                limitUsers: !1,
              });
            });
        }
        renderComponent() {
          const {
              store: e,
              group: t,
              spacePermissionsSettingsStore: s,
              disabled: i,
            } = this.props,
            { groupsFilter: o } = s.state,
            { limitUsers: n } = this.stores.spacePermissionGroupStore.state,
            d = Le.a({ intl: this.props.intl, group: t }),
            {
              countRemainingUsers: l,
              totalNumberMembers: u,
              limitedUserValues: m,
            } = Le.b({
              group: t,
              spaceStore: e,
              limit: n && !o ? Fe.defaultLimit : void 0,
            }),
            h = p.a.sortBy(m, (e) => Object(g.f)(e)),
            b = o ? Object(S.b)(o, h, (e) => Object(g.f)(e)) : h,
            { mouseEntered: v } = this.stores.mouseStore.state,
            f = v && !Pe.a.state.isKeyboardMode && !i,
            { editingNameGroupId: M, groupNameInputValue: w } = s.state;
          return r()(
            "div",
            {
              style: { marginBottom: 36, fontSize: 14, width: "100%" },
              onMouseEnter: this.handleMouseEnter,
              onMouseLeave: this.handleMouseLeave,
              onMouseDown: this.handleMouseDown,
            },
            void 0,
            r()(
              "div",
              { style: { display: "flex" } },
              void 0,
              !i &&
                r()(ge.a, {
                  isVisible: !0,
                  animationStyle: { opacity: f ? 1 : 0 },
                  enterAnimationStyle: { opacity: 0 },
                  exitAnimationStyle: { opacity: 0 },
                  render: () =>
                    r()(
                      "div",
                      {
                        style: { marginLeft: -24, marginRight: 4 },
                        className: Fe.dragHandleClass,
                      },
                      void 0,
                      r()(be.a, { hideClickMessage: !0 })
                    ),
                }),
              r()(
                ie.a,
                i
                  ? {
                      disabled: !0,
                      icon: t.icon
                        ? { pointer: e.pointer, icon: t.icon }
                        : void 0,
                      size: 22,
                      isEmptyPage: !1,
                      title: d,
                      style: { marginLeft: 3, marginRight: 3 },
                    }
                  : {
                      disabled: !1,
                      bucket: "public",
                      icon: t.icon
                        ? { pointer: e.pointer, icon: t.icon }
                        : void 0,
                      size: 22,
                      isEmptyPage: !1,
                      title: d,
                      onChange: this.handleIconChange,
                      style: { marginLeft: 3, marginRight: 3 },
                    }
              ),
              M === t.id
                ? r()(
                    fe.a,
                    { capture: !0, onEsc: this.handleNameCancel },
                    void 0,
                    r()(Me.b, {
                      disabled: i,
                      type: Me.b.Type.Inline,
                      style: {
                        marginLeft: 4,
                        cursor: "text",
                        fontWeight: ye.a.fontWeight.semibold,
                      },
                      placeholderStyle: {
                        marginLeft: 4,
                        cursor: "text",
                        color: this.theme.lightTextColor,
                        fontWeight: ye.a.fontWeight.semibold,
                      },
                      placeholder: this.props.intl.formatMessage({
                        id: "spacePermissionsSettings.groupsTab.userGroup.groupNameInput.placeholder",
                        defaultMessage: "Untitled",
                      }),
                      focus: !0,
                      value: w,
                      onChange: this.handleNameChange,
                      onBlur: this.handleNameAccept,
                      onSubmit: this.handleNameAccept,
                    })
                  )
                : r()(
                    j.a,
                    {
                      isSmall: !0,
                      style: {
                        fontWeight: ye.a.fontWeight.semibold,
                        marginLeft: -2,
                        marginTop: -1,
                      },
                      onClick: this.handleRename,
                      disabled: i,
                      className: "notranslate",
                    },
                    void 0,
                    d
                  ),
              u > 0 &&
                r()(
                  "div",
                  {
                    style: {
                      alignItems: "center",
                      marginLeft: 8,
                      color: this.theme.mediumTextColor,
                    },
                    className: "notranslate",
                  },
                  void 0,
                  r()(z.FormattedMessage, {
                    id: "spacePermissionsSettings.groupsTab.userGroup.memberCount",
                    defaultMessage:
                      "{numberOfGroupMembers, plural, one {{numberOfGroupMembers} member} other {{numberOfGroupMembers} members}}",
                    values: { numberOfGroupMembers: u },
                  })
                ),
              r()("div", { style: { flexGrow: 1 } }),
              !i &&
                r()(k.a, {
                  popupType: ne.b.Popup,
                  render: this.renderActionMenu,
                  buttonPopupStore: this.stores.actionMenuButtonPopupStore,
                  renderOrigin: (e) =>
                    c.a.createElement(ke.a, a()({ icon: q.a.dots }, e)),
                })
            ),
            r()(y.a, { size: 12 }),
            b.map(this.renderUser),
            l > 0 &&
              r()(
                "div",
                {},
                void 0,
                r()(
                  j.a,
                  {
                    isGray: !0,
                    style: { marginTop: 4 },
                    onClick: this.handleShowMoreClick,
                  },
                  void 0,
                  r()(z.FormattedMessage, {
                    id: "spacePermissionsSettings.groupsTab.showMoreUsersButton.label",
                    defaultMessage:
                      "{numberOfHiddenUsers, plural, one {Show {numberOfHiddenUsers} more} other {Show {numberOfHiddenUsers} more}}",
                    values: { numberOfHiddenUsers: l },
                  })
                )
              ),
            !i &&
              r()(k.a, {
                popupType: ne.b.Popup,
                render: this.renderAddMemberMenu,
                buttonPopupStore: this.stores.addMemberButtonPopupStore,
                onClose: this.handleAddMemberButtonPopupClose,
                style: { width: 400 },
                renderOrigin: (e) =>
                  r()(
                    "div",
                    {},
                    void 0,
                    c.a.createElement(
                      j.a,
                      a()(
                        { isGray: !0, icon: q.a.plus, style: { marginTop: 4 } },
                        e
                      ),
                      r()(z.FormattedMessage, {
                        id: "spacePermissionsSettings.groupsTab.groupList.addMemberButton.label",
                        defaultMessage: "Add members",
                      })
                    )
                  ),
              })
          );
        }
      }
      d()(Fe, "dragHandleClass", "drag_handle"), d()(Fe, "defaultLimit", 10);
      var xe = Object(z.injectIntl)(Fe),
        Re = s("g8hj"),
        Ae = s("vJXr"),
        Oe = s("toub"),
        Ee = s("IYZQ"),
        De = s("bxQm"),
        Ue = s("sSHh"),
        Ge = s("aEEb"),
        Ne = s("58VE"),
        Ve = s("lEhh"),
        je = s("aZ00"),
        qe = s("wlCD"),
        He = s("0CAA"),
        _e = s("rQb/"),
        ze = s("L0YQ"),
        We = s("VhAz"),
        Ye = s("gHFd"),
        Qe = s("qX+M");
      class Ze extends M.a {
        constructor(...e) {
          super(...e),
            d()(this, "storeTypes", { spacePermissionsSettingsStore: v.b }),
            d()(this, "renderSpaceGroup", (e) => {
              const { store: t } = this.props,
                { spacePermissionsSettingsStore: s } = this.stores;
              return r()(
                xe,
                {
                  store: t,
                  group: e,
                  spacePermissionsSettingsStore: s,
                  disabled: !this.canEditGroups(),
                },
                e.id
              );
            }),
            d()(this, "handleUpdateClick", () => {
              const e = Object(z.defineMessages)({
                updatingPermissions: {
                  id: "spacePermissionsSettings.updatePermissionsMessage",
                  defaultMessage: "Updating…",
                },
              });
              N.b({ message: e.updatingPermissions });
            }),
            d()(this, "handleUpdateComplete", () => {
              N.a();
            }),
            d()(this, "handleTabClick", (e) => {
              const t = e;
              switch (t) {
                case v.a.Members:
                  G.Td(this.environment, { tab: "members" });
                  break;
                case v.a.Groups:
                  G.Td(this.environment, { tab: "groups" });
                  break;
                case v.a.Guests:
                  G.Td(this.environment, { tab: "guests" });
                  break;
                default:
                  Object(We.f)(t);
              }
              this.stores.spacePermissionsSettingsStore.setState({
                ...this.stores.spacePermissionsSettingsStore.state,
                currentTab: e,
              });
            }),
            d()(this, "handleCreateGroupClick", () => {
              E.createAndCommit(this.environment, (e) => {
                const t = b.f({ spaceStore: this.props.store, transaction: e });
                t &&
                  this.stores.spacePermissionsSettingsStore.setState({
                    ...this.stores.spacePermissionsSettingsStore.state,
                    editingNameGroupId: t.id,
                    groupNameInputValue: "",
                  });
              }),
                G.Nd(this.environment);
            }),
            d()(this, "handleGroupReorder", (e) => {
              const t = this.props.store.getValue();
              if (t) {
                const s = t.permission_groups || [],
                  i = p.a.compact(e.map((e) => s.find((t) => t.id === e)));
                E.createAndCommit(this.environment, (e) => {
                  b.z({
                    spaceStore: this.props.store,
                    groups: i,
                    transaction: e,
                  });
                });
              }
              G.Rd(this.environment);
            }),
            d()(this, "handleFilterChange", (e) => {
              this.stores.spacePermissionsSettingsStore.setState({
                ...this.stores.spacePermissionsSettingsStore.state,
                groupsFilter: e.target.value,
              });
            }),
            d()(this, "handleMembersShowMoreClick", () => {
              this.stores.spacePermissionsSettingsStore.setState({
                ...this.stores.spacePermissionsSettingsStore.state,
                limitMembers: !1,
              });
            }),
            d()(this, "handleGuestsShowMoreClick", () => {
              this.stores.spacePermissionsSettingsStore.setState({
                ...this.stores.spacePermissionsSettingsStore.state,
                limitGuests: !1,
              });
            }),
            d()(this, "handleInviteLinkClick", () => {
              const e = !this.getInviteLinkEnabled();
              G.qc(this.environment, { enabled: e }),
                E.createAndCommit(this.environment, (t) => {
                  b.v({
                    transaction: t,
                    spaceStore: this.props.store,
                    inviteLinkEnabled: Boolean(e),
                  });
                });
            }),
            d()(this, "handleMemberPermissionRoleChange", async (e, t, s) => {
              const { store: i } = this.props,
                a = this.environment.currentUser.id;
              if (e.userId === a && "none" === t) {
                (await b.n({
                  environment: this.environment,
                  spaceId: i.id,
                  userSettingsStore: s,
                })) && Oe.a.setState({ ...Oe.a.state, open: !1 });
              } else
                this.handleUpdateClick(),
                  "none" === t
                    ? (await R.removeUsersFromSpace(this.environment, {
                        userIds: [e.userId],
                        spaceId: i.id,
                        removePagePermissions: !0,
                        revokeUserTokens: !0,
                      }),
                      await A.e(this.environment))
                    : await E.createAndCommit(this.environment, (s) =>
                        h.f({
                          environment: this.environment,
                          store: i,
                          permissionItems: [
                            {
                              type: "user_permission",
                              role: t,
                              user_id: e.userId,
                            },
                          ],
                          transaction: s,
                        })
                      ),
                  this.handleUpdateComplete();
            });
        }
        renderComponent() {
          const { store: e, isMobile: t } = this.props;
          if (!Ae.a.state.online) return this.renderOfflineMessage();
          const { data: s } = _.default.state;
          if (!s) return this.renderLoadingSpinner();
          const i = H.v(s);
          if (
            !p.a.every(
              i.map((t) =>
                f.a.createChildStore(e, { table: g.a, id: t.userId }).isReady()
              )
            )
          )
            return this.renderLoadingSpinner();
          const a = i.filter(m.c),
            o = i.filter(m.b),
            { currentTab: n } = this.stores.spacePermissionsSettingsStore.state;
          if (t)
            return r()(
              u.Fragment,
              {},
              void 0,
              this.canAdmin() &&
                r()(
                  L.a,
                  { shouldShowBottomDivider: !0 },
                  void 0,
                  this.renderMobileInviteButton(),
                  r()(
                    "div",
                    { style: this.mobileMenuItemStyle() },
                    void 0,
                    this.renderInviteLink()
                  )
                ),
              r()(L.a, {}, void 0, this.renderSpaceMembers(a))
            );
          const d = [
            r()(z.FormattedMessage, {
              id: "spacePermissionsSettings.membersTab.title",
              defaultMessage: "Members ({numberOfMembers})",
              values: { numberOfMembers: a.length },
            }),
            r()(z.FormattedMessage, {
              id: "spaceBasicSettings.groupsTab.title",
              defaultMessage: "Groups",
            }),
          ];
          return (
            o.length > 0 &&
              d.push(
                r()(z.FormattedMessage, {
                  id: "spacePermissionsSettings.guestsTab.title",
                  defaultMessage: "Guests ({numberOfGuests})",
                  values: { numberOfGuests: o.length },
                })
              ),
            r()(
              K.a,
              {},
              void 0,
              r()(ee.a, {
                tabs: d,
                selectedIndex: n,
                onChange: this.handleTabClick,
                style: {
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginTop: -6,
                  marginBottom: 14,
                },
                tabStyle: { fontSize: 16 },
              }),
              this.renderTab(n, a, o)
            )
          );
        }
        renderLoadingSpinner() {
          return r()(qe.a, { style: { margin: "calc(50% - 1em) auto" } });
        }
        renderOfflineMessage() {
          return r()(
            Ge.a,
            { isSmall: !0, style: { textAlign: "center" } },
            void 0,
            r()(z.FormattedMessage, {
              id: "spacePermissionsSettings.offlineMessage",
              defaultMessage: "Please go online to manage members.",
            })
          );
        }
        renderHelp() {
          return r()(
            "div",
            { style: { marginTop: 24, marginBottom: 24 } },
            void 0,
            r()(Ue.a, {
              title: r()(z.FormattedMessage, {
                id: "spacePermissionsSettings.helpButton.caption",
                defaultMessage: "Learn about adding members to your workspace",
              }),
              href: Object(He.a)("guides.members"),
              analyticsFrom: "members_settings",
            })
          );
        }
        renderTab(e, t, s) {
          return e === v.a.Members
            ? r()(u.Fragment, {}, void 0, this.renderSpaceMembers(t))
            : e === v.a.Guests
            ? r()(u.Fragment, {}, void 0, this.renderSpaceGuests(s))
            : this.renderGroupsTab();
        }
        renderGroupsTab() {
          const { store: e } = this.props,
            { groupsFilter: t } =
              this.stores.spacePermissionsSettingsStore.state,
            s = e.getValue(),
            i = this.canUseGroups(),
            o = this.canEditGroups();
          if (s) {
            const e = s.permission_groups || [];
            return r()(
              "div",
              {},
              void 0,
              i
                ? r()(
                    Ge.a,
                    { isSmall: !0, isMultiline: !0, style: { width: "80%" } },
                    void 0,
                    r()(z.FormattedMessage, {
                      id: "spacePermissionsSettings.groupsTab.caption",
                      defaultMessage:
                        "Set up groups to conveniently control page permissions from the share menu.",
                    })
                  )
                : r()(ze.a, {
                    for: "team",
                    from: "permission_groups",
                    icon: q.a.group,
                    title: r()(z.FormattedMessage, {
                      id: "spacePermissionsSettings.groupsTab.upgradeTitle",
                      defaultMessage: "Upgrade to create groups",
                    }),
                    caption: r()(z.FormattedMessage, {
                      id: "spacePermissionsSettings.groupsTab.upgradeCaption",
                      defaultMessage:
                        "Upgrade to the Team Plan to set up groups and control permissions from the share menu.",
                    }),
                    learnMoreRoute: "guides.groups",
                  }),
              r()(y.a, { size: 24, isHidden: !0 }),
              r()(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  },
                },
                void 0,
                i &&
                  r()(D.a, {
                    renderTooltip: () =>
                      this.canAdmin()
                        ? r()(z.FormattedMessage, {
                            id: "spacePermissionsSettings.groupsTab.upgradeMessage",
                            defaultMessage:
                              "Upgrade to Team or Enterprise to use permission groups.",
                          })
                        : r()(z.FormattedMessage, {
                            id: "spacePermissionsSettings.groupsTab.adminsOnly",
                            defaultMessage:
                              "Only admins can add a permission group.",
                          }),
                    render: (e) =>
                      c.a.createElement(
                        Ce.a,
                        a()(
                          {
                            isLarge: !0,
                            onClick: this.handleCreateGroupClick,
                            disabled: !o,
                          },
                          o ? void 0 : e
                        ),
                        r()(z.FormattedMessage, {
                          id: "spacePermissionsSettings.groupsTab.createGroupButton.label",
                          defaultMessage: "Create a group",
                        })
                      ),
                  }),
                e.length > 0 &&
                  r()(J.b, {
                    placeholder: this.props.intl.formatMessage({
                      id: "spacePermissionsSettings.groupsTab.filterGroupsInput.placeholder",
                      defaultMessage: "Filter by email or name…",
                    }),
                    left: q.a.searchThick(this.getSearchIconStyle()),
                    showClearButton: !0,
                    format: J.b.Format.Small,
                    value: t,
                    style: { ...Ze.filterStyle, marginRight: 0 },
                    onChange: this.handleFilterChange,
                  })
              ),
              e.length > 0 &&
                r()(y.a, { size: 24, style: { marginBottom: 24 } }),
              o
                ? r()(Re.b, {
                    direction: Re.a.Vertical,
                    keys: e.map((e) => e.id),
                    renderKey: (t, s) => this.renderSpaceGroup(e[s]),
                    isFullWidth: !0,
                    onDrop: this.handleGroupReorder,
                  })
                : r()("div", {}, void 0, e.map(this.renderSpaceGroup))
            );
          }
        }
        renderSpaceMembers(e) {
          return this.props.isMobile
            ? this.renderMobileMemberList(e)
            : r()(
                "div",
                {},
                void 0,
                !this.shouldRenderUpsell() && this.renderHelp(),
                this.shouldRenderUpsell() && this.renderUpsell(),
                this.renderInviteLink(),
                this.renderDesktopMemberList(e)
              );
        }
        renderInviteLink() {
          if (!this.canUseInviteLink()) return;
          const e = this.getInviteLink(),
            t = this.getInviteLinkEnabled();
          if (!e) return;
          const { spacePermissionsSettingsStore: s } = this.stores;
          return r()(
            "div",
            {},
            void 0,
            r()(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  cursor: "pointer",
                },
              },
              void 0,
              r()(
                "div",
                { style: { marginRight: 8, flexGrow: 1 } },
                void 0,
                r()(
                  _e.a,
                  {},
                  void 0,
                  r()(z.FormattedMessage, {
                    id: "spacePermissionsSettings.spaceMembers.inviteLink.title",
                    defaultMessage: "Invite link",
                  })
                ),
                r()(
                  Ge.a,
                  {
                    isSmall: !0,
                    isMultiline: !0,
                    style: { marginTop: 2, width: "85%" },
                  },
                  void 0,
                  r()(z.FormattedMessage, {
                    id: "spacePermissionSettings.spaceMembers.inviteLink.caption",
                    defaultMessage:
                      "Share this secret link to invite people to this workspace. Only admins can see this.",
                  }),
                  " ",
                  !this.props.isMobile && this.renderInviteLinkReset()
                )
              ),
              r()(
                "div",
                { style: { marginTop: 5 } },
                void 0,
                r()(Ve.a, { on: t, onClick: this.handleInviteLinkClick })
              )
            ),
            s && t && e && this.renderInviteLinkUrl(e),
            r()(y.a, { size: 40 })
          );
        }
        renderInviteLinkReset() {
          return r()(z.FormattedMessage, {
            id: "spacePermissionSettings.spaceMembers.inviteLink.resetLink",
            defaultMessage:
              "You can <resetlink>reset the link</resetlink> to generate a new invite link.",
            values: {
              resetlink: (...e) => {
                const { store: t } = this.props,
                  s = t.getValue();
                if (s)
                  return r()(
                    Ee.a,
                    {
                      onClick: () => {
                        x.showDialog({
                          message: r()(z.FormattedMessage, {
                            id: "spacePermissionsSettings.inviteLinkRefreshModal.description",
                            defaultMessage:
                              "Are you sure you want to reset your invite link? Your old one will no longer be able to be used.",
                          }),
                          showCancel: !0,
                          keepFocus: !1,
                          handleCancel: x.dismissDialog,
                          items: [
                            {
                              label: r()(z.FormattedMessage, {
                                id: "spacePermissionsSettings.inviteLinkRefreshModal.accept",
                                defaultMessage: "Reset",
                              }),
                              color: "red",
                              onAccept: async () => {
                                await R.refreshInviteLink(this.environment, {
                                  spaceId: s.id,
                                }),
                                  A.e(this.environment);
                              },
                            },
                          ],
                        });
                      },
                    },
                    void 0,
                    e
                  );
              },
            },
          });
        }
        renderInviteLinkUrl(e) {
          const { mobileNative: t } = this.environment,
            s = r()(z.FormattedMessage, {
              id: "spacePermissionsSettings.spaceMembers.inviteLink.copyButton",
              defaultMessage: "Copy link",
            }),
            i = () => {
              je.c({ environment: this.environment, stringValue: e }),
                G.xf(this.environment);
            },
            a = () => {
              t && t.share(e), G.xf(this.environment);
            };
          return this.props.isMobile
            ? r()(
                "div",
                {},
                void 0,
                r()(J.b, {
                  type: "text",
                  format: J.a.Default,
                  value: e,
                  disabled: !0,
                }),
                t
                  ? r()(
                      V.a,
                      { onClick: a, style: { marginTop: 10, width: "100%" } },
                      void 0,
                      r()(z.FormattedMessage, {
                        id: "spacePermissionsSettings.spaceMembers.inviteLink.shareButton",
                        defaultMessage: "Share link",
                      })
                    )
                  : r()(
                      V.a,
                      { onClick: i, style: { marginTop: 10, width: "100%" } },
                      void 0,
                      s
                    )
              )
            : r()(
                "div",
                {},
                void 0,
                r()(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "flex-start",
                      marginTop: 12,
                    },
                  },
                  void 0,
                  r()(J.b, {
                    type: "text",
                    format: J.a.Default,
                    value: e,
                    disabled: !0,
                    style: {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      width: "calc(100% - 90px)",
                      height: 32,
                    },
                  }),
                  r()(
                    Ce.a,
                    {
                      onClick: i,
                      style: {
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        width: 90,
                      },
                      isLarge: !0,
                    },
                    void 0,
                    s
                  )
                )
              );
        }
        renderMobileMemberList(e) {
          const { store: t } = this.props;
          return r()(
            u.Fragment,
            {},
            void 0,
            e.map((e) => {
              const s = f.a
                .createChildStore(t, { table: g.a, id: e.userId })
                .getValue();
              return r()(
                "div",
                {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    padding: 10,
                    borderBottom: "1px solid ".concat(
                      this.theme.lightDividerColor
                    ),
                    background: this.theme.contentBackground,
                  },
                },
                void 0,
                this.renderMember(s),
                r()(
                  "div",
                  { style: { textAlign: "center", marginLeft: "auto" } },
                  void 0,
                  this.renderUserPermission(e)
                )
              );
            })
          );
        }
        renderUpsell() {
          const { data: e } = _.default.state,
            t =
              e && !H.A(this.environment, e) && "subscribed_admin" !== e.type
                ? "team_free"
                : "team";
          return c.a.createElement(
            c.a.Fragment,
            null,
            r()(ze.a, {
              for: t,
              from: "members_settings",
              icon: q.a.membersFilled,
              title: r()(z.FormattedMessage, {
                id: "spacePermissionSettings.memberUpsell.title",
                defaultMessage: "Share with unlimited members",
              }),
              caption: r()(z.FormattedMessage, {
                id: "spacePermissionSettings.memberUpsell.caption",
                defaultMessage:
                  "Try Notion for Teams for a collaborative workspace, unlimited team members, and advanced permissions.",
              }),
              learnMoreRoute: "guides.members",
              upgradeMessage: r()(
                z.FormattedMessage,
                "team_free" === t
                  ? {
                      id: "spacePermissionSettings.memberUpsell.alternativeTrialLabel",
                      defaultMessage: "Try it free",
                    }
                  : {
                      id: "spacePermissionSettings.memberUpsell.alternativeUpgradeLabel",
                      defaultMessage: "Upgrade to Team Plan",
                    }
              ),
            }),
            r()(y.a, { size: 48 })
          );
        }
        renderDesktopMemberList(e) {
          const { spacePermissionsSettingsStore: t } = this.stores,
            { membersFilter: s, limitMembers: i } = t.state,
            a = this.getFilteredMembers(e, s),
            o = i ? a.slice(0, Ze.defaultLimit) : a;
          return r()(
            c.a.Fragment,
            {},
            void 0,
            r()(
              "div",
              { style: { marginRight: 8, flexGrow: 1 } },
              void 0,
              r()(
                _e.a,
                {},
                void 0,
                r()(z.FormattedMessage, {
                  id: "spacePermissionsSettings.spaceMembers.members.title",
                  defaultMessage: "Members",
                })
              )
            ),
            this.renderInviteViaDomainCaption(),
            r()(y.a, { size: 16, isHidden: !0 }),
            r()(
              "div",
              {},
              void 0,
              r()(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  },
                },
                void 0,
                this.renderInviteButton(),
                r()(J.b, {
                  placeholder: this.props.intl.formatMessage({
                    id: "spacePermissionsSettings.membersTab.filterMembersInput.placeholder",
                    defaultMessage: "Filter by email or name…",
                  }),
                  left: q.a.searchThick(this.getSearchIconStyle()),
                  showClearButton: !0,
                  format: J.b.Format.Small,
                  value: s,
                  style: Ze.filterStyle,
                  onChange: (e) => {
                    t.setState({
                      ...t.state,
                      membersFilter: e.target.value,
                      limitMembers: !0,
                    });
                  },
                })
              ),
              this.renderUserTable(o),
              a.length > Ze.defaultLimit &&
                i &&
                r()(
                  De.a,
                  {
                    style: Ze.showMoreButtonStyle,
                    onClick: this.handleMembersShowMoreClick,
                  },
                  void 0,
                  r()(z.FormattedMessage, {
                    defaultMessage: "Show {moreMembersCount} more",
                    id: "spacePermissionsSettings.membersTab.showMore.message",
                    values: { moreMembersCount: a.length - Ze.defaultLimit },
                  })
                )
            )
          );
        }
        renderSpaceGuests(e) {
          const { spacePermissionsSettingsStore: t } = this.stores,
            { guestsFilter: s, limitGuests: i } = t.state,
            a = this.getFilteredMembers(e, s),
            o = i ? a.slice(0, Ze.defaultLimit) : a;
          return r()(
            "div",
            {},
            void 0,
            r()(
              "div",
              {},
              void 0,
              r()(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  },
                },
                void 0,
                r()(J.b, {
                  placeholder: this.props.intl.formatMessage({
                    id: "spacePermissionsSettings.membersTab.filterGuestsInput.placeholder",
                    defaultMessage: "Filter by email or name…",
                  }),
                  left: q.a.searchThick(this.getSearchIconStyle()),
                  showClearButton: !0,
                  format: J.b.Format.Small,
                  value: s,
                  style: Ze.filterStyle,
                  onChange: (e) => {
                    t.setState({
                      ...t.state,
                      guestsFilter: e.target.value,
                      limitGuests: !0,
                    });
                  },
                })
              ),
              this.renderUserTable(o),
              a.length > Ze.defaultLimit &&
                i &&
                r()(
                  De.a,
                  {
                    style: Ze.showMoreButtonStyle,
                    onClick: this.handleGuestsShowMoreClick,
                  },
                  void 0,
                  r()(z.FormattedMessage, {
                    id: "spacePermissionsSettings.membersTab.showMoreGuestsButton.label",
                    defaultMessage:
                      "{numberOfHiddenGuests, plural, one {Show {numberOfHiddenGuests} more} other {Show {numberOfHiddenGuests} more}}",
                    values: {
                      numberOfHiddenGuests: a.length - Ze.defaultLimit,
                    },
                  })
                )
            )
          );
        }
        renderMobileInviteButton() {
          return r()(
            u.Fragment,
            {},
            void 0,
            r()(
              "div",
              { style: this.mobileMenuItemStyle() },
              void 0,
              this.renderInviteButton({ flex: 1 })
            ),
            r()("div", {
              style: {
                borderBottom: "1px solid ".concat(
                  this.theme.regularDividerColor
                ),
              },
            })
          );
        }
        renderInviteButton(e) {
          const { store: t } = this.props;
          return r()(Ye.LazyPermissionsInvite, {
            disabled: !this.canAdmin(),
            store: t,
            onInviteClick: this.handleUpdateClick,
            onInviteComplete: this.handleUpdateComplete,
            isSubscribed: this.isSubscribed(),
            membersOnly: !1,
            upgradeButtonName: "space_permission_settings",
            shouldGrow: !1,
            buttonStyle: e,
          });
        }
        renderInviteViaDomainCaption() {
          const { store: e } = this.props,
            t = b.l(e);
          return r()(
            Ge.a,
            { isSmall: !0, isMultiline: !0, style: { width: "80%" } },
            void 0,
            r()(
              z.FormattedMessage,
              t
                ? {
                    id: "spaceBasicSettings.membersTab.manageMembersWithLinkCaption",
                    defaultMessage: "Manage members here.",
                  }
                : {
                    id: "spaceBasicSettings.membersTab.manageMembersWithoutLinkCaption",
                    defaultMessage:
                      "Manage members here, or <setupdomainlink>set up a domain</setupdomainlink>, so everyone with allowed email domains can join the workspace automatically.",
                    values: {
                      setupdomainlink: (...e) =>
                        r()(
                          Ee.a,
                          {
                            onClick: () => {
                              Oe.a.setState({
                                ...Oe.a.state,
                                currentTab: "settings",
                              });
                            },
                          },
                          void 0,
                          e
                        ),
                    },
                  }
            )
          );
        }
        getFilteredMembers(e, t) {
          const { store: s } = this.props;
          return t && t.length > 0
            ? Object(S.b)(t, e, (e) => {
                const t = f.a
                  .createChildStore(s, { table: g.a, id: e.userId })
                  .getValue();
                return t ? Object(g.f)(t) : "";
              })
            : e;
        }
        renderUserTable(e) {
          const { store: t } = this.props;
          return r()($.a, {
            columns: [
              {
                key: "user",
                header: r()(z.FormattedMessage, {
                  id: "spacePermissionsSettings.userTable.userColumn.header",
                  defaultMessage: "User",
                }),
                style: { width: "75%" },
              },
              {
                key: "access_level",
                header: r()(z.FormattedMessage, {
                  id: "spacePermissionsSettings.userTable.accessLevelColumn.header",
                  defaultMessage: "Access level",
                }),
                style: { width: "25%", textAlign: "center" },
              },
            ],
            rows: e.map((e) => {
              const s = f.a
                .createChildStore(t, { table: g.a, id: e.userId })
                .getValue();
              return {
                key: e.userId,
                columns: [
                  this.renderMember(s),
                  r()(
                    "div",
                    { style: { textAlign: "center" } },
                    void 0,
                    this.renderUserPermission(e)
                  ),
                ],
              };
            }),
          });
        }
        renderMember(e) {
          if (e)
            return r()(
              "div",
              {
                style: { display: "flex", alignItems: "center", maxWidth: 300 },
              },
              void 0,
              r()(Ne.a, { userValue: e, size: 28 }),
              r()(
                "div",
                { style: { minWidth: 0, marginLeft: 6, marginRight: 6 } },
                void 0,
                r()(Ge.a, { className: "notranslate" }, void 0, Object(g.e)(e)),
                r()(Ge.a, { isSmall: !0 }, void 0, e.email)
              )
            );
        }
        renderUserPermission(e) {
          return "none" === e.role
            ? r()(Z, {
                store: this.props.store,
                guest: e,
                isSubscribed: this.isSubscribed(),
              })
            : this.renderMemberRoleSelect(e);
        }
        renderMemberRoleSelect(e) {
          const t = this.environment.currentUser.id,
            { currentUserSettingsStore: s } = Ie.default.state;
          if (s)
            return r()(X.a, {
              role: e.role,
              table: te.a,
              type: "user_permission",
              disabled: !this.canAdmin(),
              isUserPermission: e.userId === t,
              isSubscribed: this.isSubscribed(),
              upgradeButtonName: "space_permission_item",
              onChange: (t) => this.handleMemberPermissionRoleChange(e, t, s),
            });
        }
        isSubscribed() {
          const { data: e } = _.default.state;
          return Boolean(e && H.D(e));
        }
        canAdmin() {
          return this.props.store.canAdmin();
        }
        canUseGroups() {
          return H.J(this.environment) && this.isSubscribed();
        }
        canEditGroups() {
          return this.canUseGroups() && this.canAdmin();
        }
        canUseInviteLink() {
          return this.canAdmin() && H.J(this.environment);
        }
        shouldRenderUpsell() {
          const e = this.props.store.getValue();
          return Boolean(e && "personal" === e.plan_type && this.canAdmin());
        }
        getInviteLinkEnabled() {
          const e = this.props.store.getValue();
          return Boolean(e && e.invite_link_enabled);
        }
        getInviteLink() {
          const e = _.default.state.data,
            t = this.props.store.getValue(),
            s =
              !e ||
              ("subscribed_admin" !== e.type && "unsubscribed_admin" !== e.type)
                ? void 0
                : e.inviteLinkCode;
          if (t && s)
            return Object(Qe.getSpaceInviteLinkUrl)(this.environment, t, s);
        }
        getSearchIconStyle() {
          return {
            width: 14,
            height: 14,
            marginRight: 6,
            flexGrow: 0,
            flexShrink: 0,
            fill: this.theme.mediumIconColor,
          };
        }
        mobileMenuItemStyle() {
          const { WindowSizeStore: e } = this.environment;
          return {
            display: "flex",
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 14,
            paddingRight: e.getSafePaddingRightCSS(14),
            background: this.theme.contentBackground,
          };
        }
      }
      d()(Ze, "defaultLimit", 50),
        d()(Ze, "filterStyle", { width: 180, borderRadius: 30 }),
        d()(Ze, "showMoreButtonStyle", { marginTop: 8 });
      t.a = Object(z.injectIntl)(Ze);
    },
    "5XPD": function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("q1tI"),
        r = s.n(o),
        n = s("wldR"),
        d = s("pqiZ"),
        l = s("lEhh"),
        p = s("N34Z"),
        u = s("MBf9"),
        c = s("y6Dp"),
        m = s("QcDD"),
        g = s("sSHh"),
        h = s("aEEb"),
        b = s("J9+s"),
        S = s("0CAA"),
        v = s("rQb/");
      class f extends n.a {
        renderComponent() {
          const { device: e } = this.environment,
            { intl: t } = this.props;
          return a()(
            "div",
            {},
            void 0,
            this.renderNotificationHeader(),
            a()(
              "div",
              {
                style: this.getSettingsOptionStyle(),
                className: "notifications-settings",
              },
              void 0,
              this.renderSettingsOption(
                t.formatMessage({
                  id: "notificationSettings.mobilePushNotificationSettings.title",
                  defaultMessage: "Mobile push notifications",
                }),
                t.formatMessage({
                  id: "notificationSettings.mobilePushNotificationSettings.description",
                  defaultMessage:
                    "Receive push notifications on mentions and comments via your mobile app.",
                }),
                "notify_mobile"
              ),
              e.isElectron &&
                a()(
                  o.Fragment,
                  {},
                  void 0,
                  a()(d.a, { size: 24 }),
                  this.renderSettingsOption(
                    t.formatMessage({
                      id: "notificationSettings.desktopNotificationSettings.title",
                      defaultMessage: "Desktop push notifications",
                    }),
                    t.formatMessage({
                      id: "notificationSettings.desktopNotificationSettings.description",
                      defaultMessage:
                        "Receive push notifications on mentions and comments immediately via your desktop app.",
                    }),
                    "notify_desktop"
                  )
                ),
              a()(d.a, { size: 24 }),
              this.renderSettingsOption(
                t.formatMessage({
                  id: "notificationSettings.emailNotificationSettings.title",
                  defaultMessage: "Email notifications",
                }),
                t.formatMessage({
                  id: "notificationSettings.emailNotificationSettings.description",
                  defaultMessage:
                    "Receive email updates on mentions, comments, and edit digests for all the pages you have followed.",
                }),
                "notify_email"
              ),
              this.getSwitchValue("notify_email") &&
                a()(
                  r.a.Fragment,
                  {},
                  void 0,
                  a()(d.a, { size: 24 }),
                  this.renderSettingsOption(
                    t.formatMessage({
                      id: "notificationSettings.emailAlwaysNotificationSettings.title",
                      defaultMessage: "Always send email notifications",
                    }),
                    t.formatMessage({
                      id: "notificationSettings.emailAlwaysNotificationSettings.description",
                      defaultMessage:
                        "Receive updates by email, even when you’re active on the app.",
                    }),
                    "notify_email_always"
                  )
                ),
              a()(d.a, { size: 24 }),
              a()(
                "div",
                { style: { marginTop: 4 } },
                void 0,
                a()(g.a, {
                  title: t.formatMessage({
                    id: "notificationSettings.helpButton.caption",
                    defaultMessage:
                      "Learn about mobile and desktop notifications",
                  }),
                  href: Object(S.a)("guides.notificationSettings"),
                  analyticsFrom: "notifications_settings",
                })
              )
            )
          );
        }
        renderNotificationHeader() {
          const { device: e } = this.environment;
          return a()(
            v.a,
            { large: !e.isMobile || void 0, divider: "full" },
            void 0,
            a()(b.FormattedMessage, {
              id: "notificationSettings.notificationSection.title",
              defaultMessage: "Notifications",
            })
          );
        }
        renderSettingsOption(e, t, s) {
          const { device: i } = this.environment,
            o = this.getSwitchValue(s);
          return a()(
            "div",
            {
              onClick: () => {
                this.handleToggle(s),
                  "notify_mobile" === s
                    ? c.ye(this.environment, { is_on: !o })
                    : "notify_desktop" === s
                    ? c.we(this.environment, { is_on: !o })
                    : ("notify_email" === s || "notify_email_always" === s) &&
                      c.xe(this.environment, { is_on: !o });
              },
              style: {
                display: "flex",
                width: "100%",
                alignItems: "center",
                cursor: "pointer",
              },
            },
            void 0,
            a()(
              "div",
              { style: { flex: 1 } },
              void 0,
              a()("div", { style: { fontSize: 14 } }, void 0, e),
              a()(
                h.a,
                {
                  isSmall: !0,
                  isMultiline: !0,
                  style: { width: "80%", marginTop: 4 },
                },
                void 0,
                t
              )
            ),
            a()(l.a, {
              on: Boolean(o),
              disabled: void 0 === o,
              isAndroid: i.isAndroid,
            })
          );
        }
        getSwitchValue(e) {
          const { currentSpaceViewStore: t } = m.default.state;
          if (t) {
            const s = t.getValue();
            if (s) return s[e];
          }
        }
        handleToggle(e) {
          const { currentSpaceViewStore: t } = m.default.state;
          if (t) {
            const s = t.getValue();
            if (s) {
              const i = s[e];
              u.createAndCommit(this.environment, (s) => {
                p.e({ store: t, data: { [e]: !i }, transaction: s });
              });
            }
          }
        }
        getSettingsOptionStyle() {
          const { device: e, WindowSizeStore: t } = this.environment;
          return {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "auto",
            paddingLeft: e.isMobile ? t.state.paddingLeftCSS : 0,
            paddingRight: e.isMobile ? t.state.paddingRightCSS : 0,
          };
        }
      }
      t.a = Object(b.injectIntl)(f);
    },
    "8Gp+": function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("lSNA"),
        r = s.n(o),
        n = (s("3bBZ"), s("q1tI"), s("J9+s")),
        d = s("wldR"),
        l = s("aEEb"),
        p = s("CSYU"),
        u = s("nFzZ"),
        c = s("Pl3d"),
        m = s("VVh3"),
        g = s("QcDD"),
        h = s("bkwR"),
        b = s("mKX5"),
        S = s("IULH"),
        v = s("rQb/");
      class f extends d.a {
        constructor(...e) {
          super(...e),
            r()(this, "storeTypes", { requestStore: p.a }),
            r()(this, "renderResult", (e, t, s) =>
              a()(
                m.a,
                { loaded: s, spinnerSize: 16, showSpinnerTimeout: 600 },
                void 0,
                e || !t
                  ? a()(
                      "div",
                      {},
                      void 0,
                      this.props.intl.formatMessage({
                        id: "userDataConsent.render.error",
                        defaultMessage: "Something went wrong",
                      })
                    )
                  : this.renderOutput(t)
              )
            ),
            r()(this, "renderOutput", (e) => {
              const t = Boolean(
                  e.expiryTime && Number(e.expiryTime) > Date.now()
                ),
                s = t ? this.revokeDataAccess : this.grantDataAccess;
              return a()(
                "div",
                { style: this.getSettingsOptionStyle() },
                void 0,
                a()(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 12,
                      width: "100%",
                    },
                  },
                  void 0,
                  a()(
                    "div",
                    { style: { flex: 1 } },
                    void 0,
                    a()(
                      v.a,
                      {},
                      void 0,
                      a()(n.FormattedMessage, {
                        id: "userDataConsentSettings.header.label",
                        defaultMessage: "Support access",
                      })
                    ),
                    a()(
                      l.a,
                      {
                        isSmall: !0,
                        isMultiline: !0,
                        style: { marginTop: 4, width: "80%" },
                      },
                      void 0,
                      t && e.expiryTime
                        ? a()(n.FormattedMessage, {
                            id: "userDataConsentSettings.accessGranted.label",
                            defaultMessage:
                              "You have granted Notion access to your account for support purposes until {expiryTime}.",
                            values: {
                              expiryTime: b.a
                                .unix(e.expiryTime / 1e3)
                                .locale(this.props.intl.locale)
                                .format("lll"),
                            },
                          })
                        : a()(n.FormattedMessage, {
                            id: "userDataConsentSettings.accessNotGranted.label",
                            defaultMessage:
                              "Grant Notion support temporary access to your account so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time.",
                          })
                    ),
                    a()(
                      S.a,
                      {
                        onClick: s,
                        isLarge: !0,
                        style: { marginTop: 12, marginBottom: 4 },
                      },
                      void 0,
                      a()(
                        n.FormattedMessage,
                        t
                          ? {
                              id: "userDataConsentSettings.revokeSupportAccess.button",
                              defaultMessage: "Revoke access",
                            }
                          : {
                              id: "userDataConsentSettings.allowSupportAccess.button",
                              defaultMessage: "Allow support access",
                            }
                      )
                    )
                  )
                )
              );
            }),
            r()(this, "fetchUserDataConsentSettings", async (e) => {
              const t = await h.getDataAccessConsent(this.environment, {});
              if ("failed" === t.type) throw t.error;
              return t.data;
            }),
            r()(this, "grantDataAccess", async () => {
              await this.setDataAccessExpiryTime({
                expiryTime: Date.now() + 14 * u.a,
              });
            }),
            r()(this, "revokeDataAccess", async () => {
              await this.setDataAccessExpiryTime({});
            }),
            r()(this, "setDataAccessExpiryTime", async (e) => {
              const t = await h.setDataAccessConsent(this.environment, e);
              if ("success" === t.type && t.data) {
                const e = this.stores.requestStore.state;
                this.stores.requestStore.setState({ ...e, result: t.data });
              }
            });
        }
        renderComponent() {
          const { currentUserStore: e } = g.default.state;
          return (
            e &&
            a()(c.a, {
              requestStore: this.stores.requestStore,
              request: { userId: e.id, expiryTime: Date.now() + 14 * u.a },
              performRequest: this.fetchUserDataConsentSettings,
              render: this.renderResult,
            })
          );
        }
        getSettingsOptionStyle() {
          const { device: e, WindowSizeStore: t } = this.environment;
          return {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "auto",
            paddingLeft: e.isMobile ? t.state.paddingLeftCSS : 0,
            paddingRight: e.isMobile ? t.state.paddingRightCSS : 0,
          };
        }
      }
      t.a = Object(n.injectIntl)(f);
    },
    "9hmv": function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("pVnL"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("q1tI")),
        p = s.n(l),
        u = s("EszA"),
        c = s("wldR"),
        m = s("LeVO"),
        g = s("y6Dp"),
        h = s("DNgp"),
        b = s("MeYt"),
        S = s("zmp8"),
        v = s("wiBh");
      class f extends c.a {
        constructor(...e) {
          super(...e),
            d()(this, "handleClick", (e) => {
              u.a({
                environment: this.environment,
                annotation: [this.props.type],
              }),
                this.props.onClick && this.props.onClick(),
                g.qe(this.environment, { action: this.props.type });
            }),
            d()(
              this,
              "isDisabledStore",
              this.createComputedStore(
                () => this.props.disabled || "editing" !== h.default.state.mode
              )
            );
        }
        renderComponent() {
          return a()(m.a, {
            renderTooltip: () => this.props.tooltipLabel,
            render: (e) =>
              p.a.createElement(
                b.a,
                r()(
                  {
                    style: this.getButtonStyle(),
                    disabled: this.isDisabledStore.state,
                    disabledFeedback: this.isDisabledStore.state,
                    onClick: this.handleClick,
                  },
                  e
                ),
                this.props.children
              ),
          });
        }
        getButtonStyle() {
          return {
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            color: Object(v.b)(this.props.type)
              ? S.g.blue
              : this.theme.regularTextColor,
            ...this.props.style,
          };
        }
      }
      t.a = f;
    },
    IoOo: function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = (s("q1tI"), s("J9+s")),
        r = s("wldR"),
        n = s("IULH"),
        d = s("rQb/"),
        l = s("aEEb"),
        p = s("prF1");
      class u extends r.a {
        renderComponent() {
          return a()(
            "div",
            {},
            void 0,
            this.renderHeader(),
            a()(
              "div",
              { style: this.getSettingsOptionStyle() },
              void 0,
              a()(
                l.a,
                {
                  isSmall: !0,
                  isMultiline: !0,
                  style: { marginTop: 2, width: "80%" },
                },
                void 0,
                this.renderMessage()
              ),
              this.renderManageSubscriptionButton()
            )
          );
        }
        renderHeader() {
          const { device: e } = this.environment;
          return a()(
            d.a,
            {
              large: !e.isMobile || void 0,
              divider: e.isMobile ? void 0 : "full",
            },
            void 0,
            a()(o.FormattedMessage, {
              id: "subscriptionSettings.title",
              defaultMessage: "Subscription",
            })
          );
        }
        renderMessage() {
          const { device: e } = this.environment;
          return e.isMobile
            ? a()(o.FormattedMessage, {
                id: "subscriptionSettings.mobileDescription",
                defaultMessage:
                  "Manage your Personal Pro subscription though the App Store.",
                description:
                  "Description for a button that will take users to Apple's App Store app to edit their subscription.",
              })
            : a()(o.FormattedMessage, {
                id: "subscriptionSettings.description",
                defaultMessage:
                  "You're currently subscribed through an in-app purchase with Apple. You can manage your subscription in Apple's subscription settings.",
                description:
                  "Description for a button that will take users to Apple's App Store app to edit their subscription.",
              });
        }
        renderManageSubscriptionButton() {
          return a()(
            p.a,
            { href: "https://apps.apple.com/account/subscriptions" },
            void 0,
            a()(
              n.a,
              { isLarge: !0, style: { marginTop: 12, marginBottom: 4 } },
              void 0,
              a()(o.FormattedMessage, {
                id: "subscriptionSettings.button",
                defaultMessage: "Manage subscription",
              })
            )
          );
        }
        getSettingsOptionStyle() {
          const { device: e, WindowSizeStore: t } = this.environment;
          return {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "auto",
            paddingLeft: e.isMobile ? t.state.paddingLeftCSS : 0,
            paddingRight: e.isMobile ? t.state.paddingRightCSS : 0,
          };
        }
      }
      t.a = u;
    },
    L0YQ: function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("lSNA"),
        r = s.n(o),
        n = (s("3bBZ"), s("q1tI"), s("wldR")),
        d = s("Ng05"),
        l = s("IULH"),
        p = s("0CAA"),
        u = s("y6Dp"),
        c = s("DbeH"),
        m = s("H4VD"),
        g = s("Sb6f"),
        h = s("J9+s");
      class b extends n.a {
        constructor(...e) {
          super(...e),
            r()(this, "handleUpgradeClick", (e) => {
              const { from: t, for: s, onUpgradeClick: i } = this.props;
              c.a(this.environment, { from: t, for: s }), i && i(e);
            }),
            r()(this, "handleLearnMoreClick", () => {
              const { from: e, learnMoreRoute: t } = this.props;
              Object(m.navigateToExternalURL)({
                environment: this.environment,
                url: Object(p.a)(t),
              }),
                u.C(this.environment, { from: e });
            });
        }
        renderComponent() {
          return a()(
            "section",
            { style: this.getWrapStyle() },
            void 0,
            this.renderIcon(),
            this.renderTitle(),
            this.renderCaption(),
            this.renderActions()
          );
        }
        renderIcon() {
          const { icon: e } = this.props;
          return e(this.getIconStyle());
        }
        renderTitle() {
          const { title: e } = this.props;
          return a()("header", { style: this.getTitleStyle() }, void 0, e);
        }
        renderCaption() {
          const { caption: e } = this.props;
          return a()("p", { style: this.getCaptionStyle() }, void 0, e);
        }
        renderActions() {
          return a()(
            "footer",
            {},
            void 0,
            this.renderUpgradeButton(),
            this.renderLearnMoreButton()
          );
        }
        renderUpgradeButton() {
          const { upgradeMessage: e } = this.props;
          return a()(
            d.a,
            { onClick: this.handleUpgradeClick, isLarge: !0 },
            void 0,
            e ||
              a()(h.FormattedMessage, {
                defaultMessage: "Upgrade",
                id: "upsellCallout.upgradeButton.text",
              })
          );
        }
        renderLearnMoreButton() {
          return a()(
            l.a,
            {
              onClick: this.handleLearnMoreClick,
              style: this.getLearnMoreButtonStyle(),
            },
            void 0,
            a()(h.FormattedMessage, {
              defaultMessage: "Learn more",
              id: "upsellCallout.learnMoreButton.text",
            })
          );
        }
        getWrapStyle() {
          const { device: e } = this.environment;
          return { fontSize: 14, ...(!e.isMobile && { maxWidth: 340 }) };
        }
        getIconStyle() {
          return {
            width: 32,
            height: "auto",
            fill: this.theme.mediumIconColor,
            marginBottom: 8,
          };
        }
        getTitleStyle() {
          return { fontWeight: g.a.fontWeight.semibold };
        }
        getCaptionStyle() {
          return {
            color: this.theme.mediumTextColor,
            marginTop: 4,
            marginBottom: 16,
          };
        }
        getLearnMoreButtonStyle() {
          return { marginLeft: 12 };
        }
      }
      t.a = b;
    },
    "VoJ/": function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("lSNA"),
        r = s.n(o),
        n = (s("3bBZ"), s("q1tI")),
        d = s("J9+s"),
        l = s("Pl3d"),
        p = s("wldR"),
        u = s("hU3F"),
        c = s("QcDD"),
        m = s("RyVQ"),
        g = s("bkwR"),
        h = s("VBxf"),
        b = s("7M94"),
        S = s("/6eU"),
        v = s("yNyh"),
        f = s("IULH"),
        M = s("Ng05"),
        y = s("MYfK"),
        w = s("zmp8"),
        P = s("aEEb"),
        C = s("bxQm"),
        k = s("Z1H8"),
        T = s("a3T4"),
        I = s("rQb/"),
        B = s("zzAG");
      class L extends p.a {
        constructor(...e) {
          super(...e),
            r()(this, "storeTypes", {
              hasPasswordStore: u.a.of(!1),
              emailStore: u.a.of(""),
            }),
            r()(this, "handleChangePasswordClick", () => {
              m.a.setState({
                open: !0,
                setNewPassword: !0,
                password: "",
                repeatPassword: "",
              });
            }),
            r()(this, "handleOldPasswordChange", (e) => {
              (m.a.isSetNewPasswordModal() || m.a.isRemovePasswordModal()) &&
                m.a.setState({
                  ...m.a.state,
                  oldPassword: e.target.value,
                  alert: void 0,
                });
            }),
            r()(this, "handleClearOldPassword", () => {
              (m.a.isSetNewPasswordModal() || m.a.isRemovePasswordModal()) &&
                m.a.setState({ ...m.a.state, oldPassword: "", alert: void 0 });
            }),
            r()(this, "handlePasswordChange", (e) => {
              m.a.isSetNewPasswordModal() &&
                m.a.setState({
                  ...m.a.state,
                  password: e.target.value,
                  alert: void 0,
                });
            }),
            r()(this, "handleCancelChangePassword", () => {
              const { onCancel: e } = m.a.state;
              m.a.reset(), e && e();
            }),
            r()(this, "handleClearPassword", () => {
              m.a.isSetNewPasswordModal() &&
                m.a.setState({
                  ...m.a.state,
                  password: "",
                  repeatPassword: "",
                  alert: void 0,
                });
            }),
            r()(this, "handleRepeatPasswordChange", (e) => {
              m.a.isSetNewPasswordModal() &&
                m.a.setState({
                  ...m.a.state,
                  repeatPassword: e.target.value,
                  alert: void 0,
                });
            }),
            r()(this, "handleClearRepeatPassword", () => {
              m.a.isSetNewPasswordModal() &&
                m.a.setState({
                  ...m.a.state,
                  repeatPassword: "",
                  alert: void 0,
                });
            }),
            r()(this, "handlePasswordBlur", () => {
              if (m.a.isSetNewPasswordModal()) {
                const { password: e, repeatPassword: t } = m.a.state;
                e &&
                  t &&
                  e !== t &&
                  m.a.setState({
                    ...m.a.state,
                    alert: this.props.intl.formatMessage({
                      id: "passwordSettings.changePasswordModal.newPasswordMismatchError",
                      defaultMessage: "Your new password does not match.",
                    }),
                  });
              }
            }),
            r()(this, "handleSubmit", async () => {
              if (!m.a.isSetNewPasswordModal()) return;
              const {
                  oldPassword: e,
                  password: t,
                  repeatPassword: s,
                } = m.a.state,
                i = this.stores.hasPasswordStore.get(),
                { intl: a } = this.props;
              let o;
              if (i && !e)
                o = a.formatMessage({
                  id: "passwordSettings.changePasswordModal.oldPasswordMissingError",
                  defaultMessage: "Please enter your old password.",
                });
              else if (t) {
                const e = Object(T.a)(t);
                e.success
                  ? s
                    ? t !== s &&
                      (o = a.formatMessage({
                        id: "passwordSettings.changePasswordModal.newPasswordsMismatchError",
                        defaultMessage: "Your passwords do not match.",
                      }))
                    : (o = a.formatMessage({
                        id: "passwordSettings.changePasswordModal.newPasswordNotRepeatedError",
                        defaultMessage: "Please repeat your new password.",
                      }))
                  : (o = this.getPasswordErrorMessage(e.reason));
              } else
                o = a.formatMessage({
                  id: "passwordSettings.changePasswordModal.passwordNotEnteredError",
                  defaultMessage: "Please enter a password.",
                });
              if (o) return void m.a.setState({ ...m.a.state, alert: o });
              const r = await g.setPassword(this.environment, {
                oldPassword: e,
                newPassword: t,
              });
              if ("success" === r.type)
                this.props.requestStore.refresh(),
                  void 0 === e
                    ? this.saveNewPasswordSuccess()
                    : this.changePasswordSuccess();
              else {
                const e = Object(B.b)(this.props.intl, r);
                m.a.setState({ ...m.a.state, alert: e });
              }
            }),
            r()(this, "handleShowRemovePasswordModalClick", () => {
              m.a.setState({ open: !0, removePassword: !0, oldPassword: "" });
            }),
            r()(this, "handleRemovePasswordClick", async () => {
              if (!m.a.isRemovePasswordModal()) return;
              const { oldPassword: e } = m.a.state;
              if (!e)
                return void m.a.setState({
                  ...m.a.state,
                  alert: this.props.intl.formatMessage({
                    id: "passwordSettings.removePasswordModal.oldPasswordNotEnteredError",
                    defaultMessage: "Please enter your current password.",
                    description:
                      "We require users to enter their password in a text box before they can delete it. This error message appears if the user attempts to delete their password but hasn't entered it into the text box.",
                  }),
                });
              const t = await g.setPassword(this.environment, {
                oldPassword: e,
                clearPassword: !0,
              });
              if ("success" === t.type)
                this.props.requestStore.refresh(), this.removePasswordSuccess();
              else {
                const e = Object(B.b)(this.props.intl, t);
                m.a.setState({
                  ...m.a.state,
                  alert:
                    e ||
                    this.props.intl.formatMessage({
                      id: "passwordSettings.removePasswordModal.message",
                      defaultMessage:
                        "Error removing password. Please try again later.",
                    }),
                });
              }
            }),
            r()(
              this,
              "defaultErrorMessage",
              this.props.intl.formatMessage({
                id: "passwordSettings.genericPasswordSaveError",
                defaultMessage:
                  "Error saving password. Please try again later.",
              })
            );
        }
        willMount(e) {
          super.willMount(e);
          const { currentUserStore: t } = c.default.state;
          if (t) {
            const e = t.getValue();
            e && this.stores.emailStore.set(e.email);
          }
        }
        renderComponent() {
          const e = this.stores.emailStore.get();
          if (!e) return;
          const { requestStore: t } = this.props;
          return a()(
            "div",
            { style: this.getSettingsOptionStyle() },
            void 0,
            a()(
              I.a,
              { smallMarginBottom: !0 },
              void 0,
              a()(d.FormattedMessage, {
                id: "passwordSettings.title",
                defaultMessage: "Password",
              })
            ),
            a()(l.a, {
              request: {},
              requestStore: t,
              performRequest: async () => {
                const t = await g.checkEmailType(this.environment, {
                  email: e,
                  allowAdminBypass: !0,
                });
                if ("success" === t.type) {
                  const { samlRedirect: e, hasPassword: s } = t.data;
                  return { samlEnforced: e && e.enforced, hasPassword: s };
                }
                throw t.error;
              },
              render: (e, t) => {
                if (e)
                  return L.renderLabel(
                    a()(d.FormattedMessage, {
                      id: "passwordSettings.passwordSetError.message",
                      defaultMessage:
                        "Your password cannot be set at this time. Please try again later.",
                    })
                  );
                if (t) {
                  const { samlEnforced: e, hasPassword: s } = t;
                  return e
                    ? L.renderLabel(
                        a()(d.FormattedMessage, {
                          id: "passwordSettings.passwordManagedThroughSAMLProvider.message",
                          defaultMessage:
                            "Your password is managed through your SAML Single Sign-on Provider.",
                          description:
                            "Message letting users know that their password is managed through a 3rd-party provider, which is why they can't set their password on Notion's password settings page.",
                        })
                      )
                    : (this.stores.hasPasswordStore.set(Boolean(s)),
                      this.renderPasswordActions());
                }
              },
            })
          );
        }
        renderPasswordActions() {
          const { isEducationPlan: e } = this.props,
            t = this.stores.hasPasswordStore.get();
          return a()(
            n.Fragment,
            {},
            void 0,
            L.renderLabel(
              a()(d.FormattedMessage, {
                id: "passwordSettings.passwordSetInstructions",
                defaultMessage:
                  "You can set a permanent password if you don't want to use temporary login codes.",
              })
            ),
            e && L.renderLabel(this.renderEducationPlanInfo()),
            a()(
              "div",
              { style: { display: "flex", alignItems: "center" } },
              void 0,
              a()(
                f.a,
                {
                  isLarge: !0,
                  onClick: this.handleChangePasswordClick,
                  style: { marginTop: 12, marginBottom: 4 },
                },
                void 0,
                a()(
                  d.FormattedMessage,
                  t
                    ? {
                        id: "passwordSettings.changePasswordButton.label",
                        defaultMessage: "Change password",
                      }
                    : {
                        id: "passwordSettings.setPasswordButton.label",
                        defaultMessage: "Set a password",
                      }
                )
              ),
              this.canRemovePassword() &&
                a()(
                  C.a,
                  {
                    onClick: this.handleShowRemovePasswordModalClick,
                    style: { marginLeft: 5, marginTop: 12, marginBottom: 4 },
                  },
                  void 0,
                  a()(d.FormattedMessage, {
                    id: "passwordSettings.removePasswordButton.label",
                    defaultMessage: "Remove password",
                  })
                )
            ),
            this.renderPasswordModal()
          );
        }
        static renderLabel(e) {
          return a()(
            P.a,
            {
              isSmall: !0,
              isMultiline: !0,
              style: { marginTop: 2, width: "80%" },
            },
            void 0,
            e
          );
        }
        renderPasswordModal() {
          const { device: e } = this.environment,
            { open: t } = m.a.state;
          return a()(S.a, {
            open: t,
            onDismiss: this.handleCancelChangePassword,
            innerStyle: {
              width: e.isPhone ? "90%" : 460,
              minHeight: 270,
              padding: 24,
            },
            className: b.pb,
            preventHideChildrenWhileOpening: !0,
            render: () =>
              a()(k.a, {
                capture: !0,
                allowEsc: !0,
                render: () =>
                  a()(
                    n.Fragment,
                    {},
                    void 0,
                    this.renderSaveNewPassword(),
                    this.renderRemovePassword()
                  ),
              }),
          });
        }
        renderSaveNewPassword() {
          const { isEducationPlan: e } = this.props;
          if (!m.a.isSetNewPasswordModal()) return;
          const {
              password: t,
              repeatPassword: s,
              oldPassword: i,
              alert: o,
            } = m.a.state,
            r = this.stores.hasPasswordStore.get(),
            l = this.stores.emailStore.get();
          return a()(
            n.Fragment,
            {},
            void 0,
            a()(v.b, {
              style: { display: "none" },
              type: "text",
              value: l,
              autoComplete: "username",
              disabled: !0,
            }),
            r &&
              a()(
                n.Fragment,
                {},
                void 0,
                a()(
                  y.a,
                  {},
                  void 0,
                  a()(d.FormattedMessage, {
                    id: "passwordSettings.changePasswordModal.oldPasswordInput.label",
                    defaultMessage: "Old Password",
                  })
                ),
                a()(v.b, {
                  type: "password",
                  value: i,
                  onChange: this.handleOldPasswordChange,
                  showClearButton: !0,
                  onClearButtonClick: this.handleClearOldPassword,
                  placeholder: this.props.intl.formatMessage({
                    id: "passwordSettings.oldPasswordInput.placeholder",
                    defaultMessage: "Enter old password...",
                  }),
                  style: { padding: "4px 8px" },
                  focusInitial: !0,
                  autoComplete: "current-password",
                })
              ),
            r
              ? a()(
                  y.a,
                  { hasMarginTop: !0 },
                  void 0,
                  a()(d.FormattedMessage, {
                    id: "passwordSettings.newPasswordInput.label",
                    defaultMessage: "New password",
                  })
                )
              : a()(
                  y.a,
                  {},
                  void 0,
                  a()(d.FormattedMessage, {
                    id: "passwordSettings.passwordInput.label",
                    defaultMessage: "Password",
                  })
                ),
            a()(v.b, {
              type: "password",
              value: t,
              onChange: this.handlePasswordChange,
              onSubmit: this.handleSubmit,
              showClearButton: !0,
              onClearButtonClick: this.handleClearPassword,
              placeholder: this.props.intl.formatMessage({
                id: "passwordSettings.newPasswordInput.placeholder",
                defaultMessage: "Enter new password...",
              }),
              style: { padding: "4px 8px" },
              focusInitial: !r,
              onBlur: this.handlePasswordBlur,
              autoComplete: "new-password",
            }),
            a()(
              y.a,
              { hasMarginTop: !0 },
              void 0,
              a()(d.FormattedMessage, {
                id: "passwordSettings.repeatPasswordInput.label",
                defaultMessage: "Repeat password",
              })
            ),
            a()(v.b, {
              type: "password",
              value: s,
              onChange: this.handleRepeatPasswordChange,
              onSubmit: this.handleSubmit,
              showClearButton: !0,
              onClearButtonClick: this.handleClearRepeatPassword,
              placeholder: this.props.intl.formatMessage({
                id: "passwordSettings.repeatPasswordInput.placeholder",
                defaultMessage: "Repeat new password...",
              }),
              style: { padding: "4px 8px" },
              onBlur: this.handlePasswordBlur,
              autoComplete: "new-password",
            }),
            a()(
              P.a,
              {
                isMultiline: !0,
                isSecondaryColor: !0,
                style: { marginTop: 14 },
              },
              void 0,
              a()(d.FormattedMessage, {
                id: "passwordSettings.passwordGuidelines",
                defaultMessage:
                  "Use a password at least 15 letters long, or at least 8 characters long with both letters and numbers.",
              })
            ),
            e &&
              a()(
                P.a,
                {
                  isMultiline: !0,
                  isSecondaryColor: !0,
                  style: { marginTop: 14 },
                },
                void 0,
                this.renderEducationPlanInfo()
              ),
            this.renderAlert(o),
            a()(
              M.a,
              {
                isLarge: !0,
                style: { marginTop: 14 },
                onClick: this.handleSubmit,
              },
              void 0,
              a()(
                d.FormattedMessage,
                r
                  ? {
                      id: "passwordSettings.changePasswordButton.label",
                      defaultMessage: "Change password",
                    }
                  : {
                      id: "passwordSettings.setPasswordButton.label",
                      defaultMessage: "Set a password",
                    }
              )
            )
          );
        }
        renderRemovePassword() {
          const { isEducationPlan: e } = this.props;
          if (!m.a.isRemovePasswordModal()) return;
          const { oldPassword: t, alert: s } = m.a.state;
          return a()(
            n.Fragment,
            {},
            void 0,
            a()(
              "div",
              { style: { fontSize: 14, width: "100%" } },
              void 0,
              a()(d.FormattedMessage, {
                id: "passwordSettings.removePasswordModal.text",
                defaultMessage:
                  "You're about to remove your password. We'll email you temporary login codes to access Notion going forward.",
                description:
                  "Message warning the user that they're about to delete their password, and telling them how to log in after their password has been deleted.",
              }),
              e &&
                a()(d.FormattedMessage, {
                  id: "passwordSettings.removePasswordModal.educationPlanWarning",
                  defaultMessage:
                    "If you lose access to your school email, you'll be unable to log back into Notion.",
                  description:
                    "Warning for users on the Education Plan that if they lose access to their school email, they won't be able to log into Notion without a password.",
                })
            ),
            a()(
              y.a,
              { hasMarginTop: !0 },
              void 0,
              a()(d.FormattedMessage, {
                id: "passwordSettings.deletePasswordModal.passwordInput.label",
                defaultMessage: "Password",
              })
            ),
            a()(v.b, {
              type: "password",
              value: t,
              onChange: this.handleOldPasswordChange,
              onSubmit: this.handleRemovePasswordClick,
              showClearButton: !0,
              onClearButtonClick: this.handleClearOldPassword,
              placeholder: this.props.intl.formatMessage({
                id: "passwordSettings.removePasswordModal.passwordInput.placeholder",
                defaultMessage: "Enter your password...",
              }),
              style: { padding: "4px 8px" },
              focusInitial: !0,
              autoComplete: "current-password",
            }),
            this.renderAlert(s),
            a()(
              M.a,
              {
                isLarge: !0,
                style: { marginTop: 14 },
                onClick: this.handleRemovePasswordClick,
              },
              void 0,
              a()(d.FormattedMessage, {
                id: "passwordSettings.removePasswordModal.removePasswordButton.label",
                defaultMessage: "Remove password",
              })
            )
          );
        }
        renderAlert(e) {
          if (e)
            return a()(
              P.a,
              { isMultiline: !0, style: { marginTop: 8, color: w.g.red } },
              void 0,
              e
            );
        }
        renderEducationPlanInfo() {
          return a()(d.FormattedMessage, {
            id: "passwordSettings.educationPlanGuidelines",
            defaultMessage:
              "If you lose access to your school email address, you'll be able to log in using your password.",
          });
        }
        getSettingsOptionStyle() {
          const { device: e, WindowSizeStore: t } = this.environment;
          return {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "auto",
            paddingLeft: e.isMobile ? t.state.paddingLeftCSS : 0,
            paddingRight: e.isMobile ? t.state.paddingRightCSS : 0,
          };
        }
        saveNewPasswordSuccess() {
          const { intl: e, isEducationPlan: t } = this.props,
            { onSubmit: s } = m.a.state;
          m.a.reset();
          const i = t
            ? e.formatMessage({
                id: "passwordSettings.setPasswordSuccess.educationMessage",
                defaultMessage:
                  "Your password is all set! You'll be able to log in, even if you lose access to your school email address.",
              })
            : e.formatMessage({
                id: "passwordSettings.setPasswordSuccess.message",
                defaultMessage: "Your password is all set!",
              });
          h.showMessage({ message: i, onAccept: s });
        }
        changePasswordSuccess() {
          const { onSubmit: e } = m.a.state;
          m.a.reset(),
            h.showMessage({
              message: this.props.intl.formatMessage({
                id: "passwordSettings.changePasswordSuccess.message",
                defaultMessage: "Your new password has been saved.",
              }),
              onAccept: e,
            });
        }
        removePasswordSuccess() {
          m.a.reset(),
            h.showMessage({
              message: this.props.intl.formatMessage({
                id: "passwordSettings.removePasswordSuccess.message",
                defaultMessage: "Your password has been removed.",
              }),
            });
        }
        getPasswordErrorMessage(e) {
          const t = B.d[e.type];
          return t
            ? this.props.intl.formatMessage(t)
            : this.defaultErrorMessage;
        }
        canRemovePassword() {
          const { isEducationPlan: e } = this.props,
            t = this.stores.hasPasswordStore.get();
          return !e && t;
        }
      }
      t.a = Object(d.injectIntl)(L);
    },
    bAi4: function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("lSNA"),
        r = s.n(o),
        n = (s("q1tI"), s("wldR")),
        d = s("aEEb"),
        l = s("Sb6f");
      class p extends n.a {
        renderComponent() {
          const { columns: e, rows: t } = this.props;
          return a()(
            "table",
            { style: this.getStyle() },
            void 0,
            a()(
              "thead",
              {},
              void 0,
              a()(
                "tr",
                { style: p.headerRowStyle },
                void 0,
                e.map((e) =>
                  a()(
                    "th",
                    { style: { ...p.tableHeaderStyle, ...e.style } },
                    e.key,
                    a()(d.a, { isSmall: !0 }, void 0, e.header)
                  )
                )
              )
            ),
            a()(
              "tbody",
              {},
              void 0,
              t.map((t) =>
                a()(
                  "tr",
                  { style: this.getRowStyle() },
                  t.key,
                  t.columns.map((t, s) => {
                    const i = e[s];
                    return a()("td", { style: p.cellStyle }, i.key, t);
                  })
                )
              )
            )
          );
        }
        getStyle() {
          return {
            width: "100%",
            fontSize: 13,
            borderTop: "1px solid ".concat(this.theme.regularDividerColor),
            borderBottom: "1px solid ".concat(this.theme.regularDividerColor),
          };
        }
        getRowStyle() {
          return {
            width: "100%",
            borderTop: "1px solid ".concat(this.theme.regularDividerColor),
          };
        }
      }
      r()(p, "cellPaddingTopBottom", 8),
        r()(p, "headerRowStyle", { height: 32, width: "100%" }),
        r()(p, "tableHeaderStyle", {
          fontWeight: l.a.fontWeight.regular,
          textAlign: "left",
          paddingTop: p.cellPaddingTopBottom,
          paddingBottom: p.cellPaddingTopBottom,
        }),
        r()(p, "cellStyle", {
          paddingTop: p.cellPaddingTopBottom,
          paddingBottom: p.cellPaddingTopBottom,
        }),
        (t.a = p);
    },
    ibYI: function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = (s("q1tI"), s("J9+s")),
        r = s("wldR"),
        n = s("rQb/"),
        d = s("lEhh"),
        l = s("aEEb");
      class p extends r.a {
        renderComponent() {
          const { device: e } = this.environment;
          return a()(
            "div",
            { style: this.getSettingsOptionStyle() },
            void 0,
            a()(
              n.a,
              {},
              void 0,
              a()(o.FormattedMessage, {
                id: "calendarSettings.startWeekOnMonday.label",
                defaultMessage: "Start week on Monday",
              })
            ),
            a()(
              "div",
              {
                onClick: this.props.onClick,
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 12,
                  cursor: "pointer",
                  width: "100%",
                },
              },
              void 0,
              a()(
                "div",
                { style: { flex: 1 } },
                void 0,
                a()(
                  l.a,
                  { isSmall: !0, isMultiline: !0, style: { width: "80%" } },
                  void 0,
                  a()(o.FormattedMessage, {
                    id: "calendarSettings.startWeekOnMonday.message",
                    defaultMessage:
                      "This will change how all calendars in your app look.",
                  })
                )
              ),
              a()(
                "div",
                { style: { marginTop: 5 } },
                void 0,
                a()(d.a, {
                  on: 1 === this.props.startDayOfWeek,
                  isAndroid: e.isAndroid,
                })
              )
            )
          );
        }
        getSettingsOptionStyle() {
          const { device: e, WindowSizeStore: t } = this.environment;
          return {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "auto",
            paddingLeft: e.isMobile ? t.state.paddingLeftCSS : 0,
            paddingRight: e.isMobile ? t.state.paddingRightCSS : 0,
          };
        }
      }
      t.a = p;
    },
    q8I6: function (e, t, s) {
      "use strict";
      var i = s("pVnL"),
        a = s.n(i),
        o = s("gcR/"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("q1tI")),
        p = s.n(l),
        u = s("GQP/"),
        c = s("wldR"),
        m = s("LeVO"),
        g = s("TDb4"),
        h = s("y6Dp"),
        b = s("MeYt"),
        S = s("DNgp"),
        v = s("ieCD"),
        f = s("wiBh"),
        M = s("J9+s"),
        y = s("cBa6");
      class w extends c.a {
        constructor(...e) {
          super(...e),
            d()(this, "handleButtonPopupClick", () => {
              u.c({ focus: !0 }), h.qe(this.environment, { action: y.b.Link });
            });
        }
        renderComponent() {
          const e = Object(f.b)(y.b.Link),
            t = this.isDisabled();
          return r()(m.a, {
            renderTooltip: () =>
              r()(
                l.Fragment,
                {},
                void 0,
                r()(
                  "div",
                  {},
                  void 0,
                  r()(M.FormattedMessage, {
                    defaultMessage: "Add link",
                    id: "selectionLinkButton.addLink.tooltip",
                    description:
                      "Prompt for the user to add a URL to link to from the selected text.",
                  })
                ),
                r()(
                  "div",
                  {},
                  void 0,
                  r()(g.a, {
                    style: { color: this.theme.mediumInvertedTextColor },
                    name: "openLinkMenu",
                  })
                )
              ),
            render: (s) =>
              p.a.createElement(
                b.a,
                a()(
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      borderRadius: 0,
                      paddingLeft: 7,
                      paddingRight: 8,
                      ...(e && { color: this.theme.blueColor }),
                      whiteSpace: "nowrap",
                      ...this.props.style,
                    },
                    disabled: t,
                    disabledFeedback: t,
                  },
                  s,
                  { onClick: this.handleButtonPopupClick }
                ),
                this.props.children
              ),
          });
        }
        isDisabled() {
          return (
            !!this.props.disabled ||
            ("editing" !== S.default.state.mode && !v.a.state.open) ||
            !!(
              Object(f.q)(y.b.User) ||
              Object(f.q)(y.b.Bot) ||
              Object(f.q)(y.b.Date) ||
              Object(f.q)(y.b.Page)
            )
          );
        }
      }
      t.a = Object(M.injectIntl)(w);
    },
    ty0h: function (e, t, s) {
      "use strict";
      var i = s("pVnL"),
        a = s.n(i),
        o = s("gcR/"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("q1tI")),
        p = s.n(l),
        u = s("J9+s"),
        c = s("mF3+"),
        m = s("i3uR"),
        g = s("SR/M"),
        h = s("wldR"),
        b = s("gbGO"),
        S = s("WgIs"),
        v = s("IULH"),
        f = s("2Y+N"),
        M = s("rQb/"),
        y = s("aEEb"),
        w = s("wvIE"),
        P = s("ZAZ2");
      const C = ["system", "light", "dark"],
        k = Object(u.defineMessages)({
          systemLabel: {
            id: "appearanceSetting.system.label",
            defaultMessage: "Use system setting",
          },
          lightLabel: {
            id: "appearanceSetting.light.label",
            defaultMessage: "Light",
          },
          darkLabel: {
            id: "appearanceSetting.dark.label",
            defaultMessage: "Dark",
          },
        });
      class T extends h.a {
        constructor(...e) {
          super(...e),
            d()(this, "storeTypes", { appearanceStore: P.a }),
            d()(this, "handleChangeAppearance", (e) => {
              Object(w.b)(this.environment, e),
                this.stores.appearanceStore.setState({ appearanceSetting: e });
            });
        }
        componentDidMount() {
          const e = Object(w.a)(this.environment);
          this.stores.appearanceStore.setState({ appearanceSetting: e });
        }
        renderComponent() {
          return r()(
            "div",
            {},
            void 0,
            this.renderHeader(),
            r()(
              "div",
              { style: this.getSettingsOptionStyle() },
              void 0,
              r()(
                y.a,
                {
                  isSmall: !0,
                  isMultiline: !0,
                  style: { marginTop: 2, width: "80%" },
                },
                void 0,
                r()(u.FormattedMessage, {
                  id: "appearanceSettings.description.message",
                  defaultMessage: "Customize how Notion looks on your device.",
                })
              ),
              this.renderAppearanceButton()
            )
          );
        }
        renderHeader() {
          const { device: e } = this.environment;
          return r()(
            M.a,
            {
              large: !e.isMobile || void 0,
              divider: e.isMobile ? void 0 : "full",
            },
            void 0,
            r()(u.FormattedMessage, {
              id: "appearanceSettings.title",
              defaultMessage: "Appearance",
            })
          );
        }
        renderAppearanceButton() {
          const { device: e } = this.environment;
          return r()(m.a, {
            popupType: e.isMobile ? m.a.PopupType.SlideUp : m.a.PopupType.Popup,
            placementToOrigin: m.a.Placement.Right,
            renderOrigin: (e) =>
              p.a.createElement(
                v.a,
                a()({}, e, {
                  isLarge: !0,
                  style: { marginTop: 12, marginBottom: 4 },
                }),
                T.getAppearanceLabel(
                  this.stores.appearanceStore.state.appearanceSetting
                ),
                c.a.chevronDown({
                  width: 10,
                  marginLeft: 4,
                  fill: this.theme.lightIconColor,
                })
              ),
            render: (t) => {
              let s;
              s = e.isMobile
                ? {
                    menuType: b.b.MenuType.Modal,
                    title: r()(u.FormattedMessage, {
                      defaultMessage: "Appearance",
                      id: "appearanceSettings.modal.title",
                    }),
                    right: r()(u.FormattedMessage, {
                      defaultMessage: "Done",
                      id: "appearanceSettings.modal.done",
                    }),
                    onClickRight: t.close,
                  }
                : { menuType: b.b.MenuType.Popup, width: 250 };
              const i = C.map((e) => ({
                key: e,
                action: (s) => {
                  this.handleChangeAppearance(e), t.close();
                },
                render: (t, s) =>
                  p.a.createElement(
                    g.a,
                    a()({}, t, { title: T.getAppearanceLabel(e) })
                  ),
              }));
              return p.a.createElement(
                b.b,
                s,
                r()(S.a, {
                  type: S.a.Type.Vertical,
                  sections: [
                    {
                      key: "appearance section",
                      render: (e) => p.a.createElement(f.a, e),
                      items: i,
                    },
                  ],
                  initialFocus: void 0,
                })
              );
            },
          });
        }
        static getAppearanceLabel(e) {
          switch (e) {
            case "light":
              return p.a.createElement(u.FormattedMessage, k.lightLabel);
            case "dark":
              return p.a.createElement(u.FormattedMessage, k.darkLabel);
            case "system":
              return p.a.createElement(u.FormattedMessage, k.systemLabel);
          }
        }
        getSettingsOptionStyle() {
          const { device: e, WindowSizeStore: t } = this.environment;
          return {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            height: "auto",
            paddingLeft: e.isMobile ? t.state.paddingLeftCSS : 0,
            paddingRight: e.isMobile ? t.state.paddingRightCSS : 0,
          };
        }
      }
      t.a = T;
    },
    typy: function (e, t, s) {
      "use strict";
      var i = s("gcR/"),
        a = s.n(i),
        o = s("pVnL"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("q1tI")),
        p = s.n(l),
        u = s("i3uR"),
        c = s("wldR"),
        m = s("LeVO"),
        g = s("uSCg"),
        h = s("y6Dp"),
        b = s("MeYt"),
        S = s("DNgp"),
        v = s("mF3+"),
        f = s("WgIs"),
        M = s("gbGO"),
        y = s("2Y+N"),
        w = s("EszA"),
        P = s("zmp8"),
        C = s("I5tp"),
        k = s("Sb6f"),
        T = s("BTUg"),
        I = s("2HDO"),
        B = s("6nbh"),
        L = s("cBa6"),
        F = s("TDb4"),
        x = s("wiBh"),
        R = s("J9+s"),
        A = s("nPEg");
      const O = p.a.Fragment;
      class E extends c.a {
        constructor(...e) {
          super(...e),
            d()(this, "storeTypes", { ignoreSelectionAreaStore: B.a }),
            d()(this, "renderHighlightColorMenuItem", (e, t, s, i) => ({
              key: t || e,
              action: () => {
                s(), this.menuItemAction(e), i.close();
              },
              render: (s) =>
                p.a.createElement(
                  C.a,
                  r()({}, s, { color: e, overrideDisplayName: t })
                ),
            })),
            d()(this, "handleToggleHighlightAnnotation", () => {
              w.a({
                environment: this.environment,
                annotation: ["h", T.a.state.color],
              }),
                h.qe(this.environment, { action: "h", color: T.a.state.color });
            }),
            d()(this, "handleButtonPopupClick", (e) => {
              h.qe(this.environment, { action: "h" });
            }),
            d()(this, "handleClose", () => {
              S.default.emit();
            }),
            d()(this, "menuItemAction", (e) => {
              w.b({ environment: this.environment, annotationType: "h" }),
                "default" !== e &&
                  (T.a.setHighlightColor(e),
                  this.handleToggleHighlightAnnotation());
            });
        }
        renderComponent() {
          const { device: e } = this.environment,
            { intl: t } = this.props;
          return a()(u.a, {
            popupType: e.isMobile ? u.a.PopupType.SlideUp : u.a.PopupType.Popup,
            originGap: 4,
            onClose: this.handleClose,
            onClick: this.handleButtonPopupClick,
            renderOrigin: (t) =>
              a()(m.a, {
                renderTooltip: () =>
                  a()(
                    O,
                    {},
                    void 0,
                    a()(
                      "div",
                      {},
                      void 0,
                      a()(R.FormattedMessage, {
                        defaultMessage: "Text color",
                        id: "highlightSelectionButton.textColor.tooltip",
                      })
                    ),
                    a()(
                      "div",
                      {},
                      void 0,
                      a()(F.a, {
                        style: { color: this.theme.mediumInvertedTextColor },
                        name: "toggleHighlight",
                      })
                    )
                  ),
                render: (s) =>
                  p.a.createElement(
                    b.a,
                    r()(
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: 7,
                          paddingRight: 6,
                          whiteSpace: "nowrap",
                          ...this.props.style,
                        },
                        disabled: this.props.disabled,
                        disabledFeedback: this.props.disabled,
                      },
                      Object(g.a)(t, s)
                    ),
                    a()(
                      "div",
                      { style: this.getColorIconStyle() },
                      void 0,
                      e.isMobile
                        ? a()(R.FormattedMessage, {
                            defaultMessage: "Color",
                            id: "highlightSelectionButton.mobileColorIcon.label",
                          })
                        : "A"
                    ),
                    v.a.chevronDown({
                      width: 10,
                      marginLeft: e.isMobile ? 4 : 3,
                      fill:
                        "dark" === this.theme.mode
                          ? P.g.white
                          : this.theme.lightIconColor,
                    })
                  ),
              }),
            render: (s) => {
              let i;
              return (
                (i = e.isMobile
                  ? {
                      menuType: M.b.MenuType.Modal,
                      title: a()(R.FormattedMessage, {
                        defaultMessage: "Text color",
                        id: "highlightSelectionButton.mobileTextColor.label",
                      }),
                      right: a()(A.CancelMenuText, {}),
                      onClickRight: () => {
                        s.close();
                      },
                    }
                  : { menuType: M.b.MenuType.Popup }),
                p.a.createElement(
                  M.b,
                  i,
                  a()(I.a, {
                    capture: e.isMobile,
                    store: this.stores.ignoreSelectionAreaStore,
                    ignoreBlockSelection: !1,
                    restoreSelection: !0,
                    focusOffscreenInput: !1,
                    render: (e) => {
                      const i = P.c.map((t) =>
                          this.renderHighlightColorMenuItem(t, void 0, e, s)
                        ),
                        o = [
                          this.renderHighlightColorMenuItem(
                            "default",
                            t.formatMessage({
                              defaultMessage: "Default background",
                              id: "highlightSelectionButton.defaultBackground.label",
                            }),
                            e,
                            s
                          ),
                          ...P.a.map((t) =>
                            this.renderHighlightColorMenuItem(t, void 0, e, s)
                          ),
                        ],
                        n = T.a.state.color;
                      return a()(f.a, {
                        type: f.a.Type.Vertical,
                        sections: [
                          {
                            key: 0,
                            items: [
                              {
                                key: 0,
                                action: () => {
                                  e(), this.menuItemAction(n), s.close();
                                },
                                render: (e) =>
                                  p.a.createElement(
                                    C.a,
                                    r()({}, e, {
                                      color: n,
                                      shortcuts: ["toggleHighlight"],
                                    })
                                  ),
                              },
                            ],
                            render: (e) =>
                              p.a.createElement(
                                y.a,
                                r()({}, e, {
                                  title: a()(R.FormattedMessage, {
                                    defaultMessage: "Last used",
                                    id: "highlightSelectionButton.lastUsedSection.label",
                                  }),
                                  isTitleUppercase: !0,
                                })
                              ),
                          },
                          {
                            key: 1,
                            items: i,
                            render: (e) =>
                              p.a.createElement(
                                y.a,
                                r()({}, e, {
                                  title: a()(R.FormattedMessage, {
                                    defaultMessage: "Color",
                                    id: "highlightSelectionButton.colorSection.label",
                                  }),
                                  isTitleUppercase: !0,
                                })
                              ),
                          },
                          {
                            key: 2,
                            items: o,
                            render: (e) =>
                              p.a.createElement(
                                y.a,
                                r()({}, e, {
                                  title: a()(R.FormattedMessage, {
                                    defaultMessage: "Background",
                                    id: "highlightSelectionButton.backgroundSection.label",
                                  }),
                                  isTitleUppercase: !0,
                                })
                              ),
                          },
                        ],
                        initialFocus: void 0,
                      });
                    },
                  })
                )
              );
            },
          });
        }
        getTextSelectionColor() {
          const e = Object(x.b)("h");
          return e ? L.Q(e) : "default";
        }
        getColorIconStyle() {
          const { device: e } = this.environment;
          return {
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 18,
            textAlign: "center",
            fontSize: 15,
            borderRadius: 2,
            ...(!e.isMobile && {
              width: 18,
              fontWeight: k.a.fontWeight.medium,
              marginBottom: 2,
            }),
            ...Object(P.n)(this.getTextSelectionColor(), this.theme),
          };
        }
      }
      t.a = Object(R.injectIntl)(E);
    },
    xPzf: function (e, t, s) {
      "use strict";
      var i = s("pVnL"),
        a = s.n(i),
        o = s("gcR/"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("q1tI")),
        p = s.n(l),
        u = s("cBa6"),
        c = s("MeYt"),
        m = s("Rnyl"),
        g = s("xstG"),
        h = s("wiBh"),
        b = s("J9+s"),
        S = s("TDb4"),
        v = s("wldR"),
        f = s("LeVO"),
        M = s("DNgp");
      class y extends v.a {
        constructor(...e) {
          super(...e),
            d()(this, "renderMenuTooltip", () => {
              const e = this.getThemeColors();
              return r()(
                p.a.Fragment,
                {},
                void 0,
                r()(
                  "div",
                  {},
                  void 0,
                  r()(b.FormattedMessage, {
                    id: "richTextMenu.equationButton.tooltip",
                    defaultMessage: "Create equation",
                  })
                ),
                r()(
                  "div",
                  {},
                  void 0,
                  r()(S.a, {
                    style: e.keyboardShortcut,
                    name: "openEquationMenu",
                  })
                )
              );
            }),
            d()(this, "handleButtonPopupClick", (e) => {
              const { onClick: t } = this.props;
              m.b({
                environment: this.environment,
                analyticsFrom: "rich_text_menu",
              }),
                t && t(e);
            }),
            d()(this, "isSelected", () => Object(h.b)(u.b.Equation)),
            d()(this, "isDisabled", () => {
              const { disabled: e } = this.props;
              if (e) return !0;
              if ("editing" !== M.default.state.mode && !g.b.isOpen())
                return !0;
              const t = {
                [u.b.User]: u.b.User,
                [u.b.Page]: u.b.Page,
                [u.b.Bot]: u.b.Bot,
                [u.b.Date]: u.b.Date,
                [u.b.TemporaryPage]: u.b.TemporaryPage,
              };
              for (const s of Object.values(t)) if (Object(h.q)(s)) return !0;
              return !1;
            }),
            d()(this, "styles", {
              equationButton: {
                display: "flex",
                alignItems: "center",
                borderRadius: 0,
                paddingLeft: 7,
                paddingRight: 8,
              },
            });
        }
        renderComponent() {
          const { style: e, children: t } = this.props,
            s = this.getThemeColors(),
            i = this.isDisabled();
          return r()(f.a, {
            renderTooltip: this.renderMenuTooltip,
            render: (o) =>
              p.a.createElement(
                c.a,
                a()(
                  {
                    style: {
                      ...this.styles.equationButton,
                      ...s.equationButton,
                      ...e,
                    },
                    disabled: i,
                    disabledFeedback: i,
                    onClick: this.handleButtonPopupClick,
                  },
                  o
                ),
                t
              ),
          });
        }
        getThemeColors() {
          return {
            equationButton: {
              color: this.isSelected()
                ? this.theme.blueColor
                : this.theme.regularTextColor,
            },
            keyboardShortcut: { color: this.theme.mediumInvertedTextColor },
          };
        }
      }
      t.a = Object(b.injectIntl)(y);
    },
    y4kc: function (e, t, s) {
      "use strict";
      var i = s("pVnL"),
        a = s.n(i),
        o = s("gcR/"),
        r = s.n(o),
        n = s("lSNA"),
        d = s.n(n),
        l = (s("3bBZ"), s("q1tI")),
        p = s.n(l),
        u = s("gRnv"),
        c = s("wldR"),
        m = s("LeVO"),
        g = s("TDb4"),
        h = s("mF3+"),
        b = s("y6Dp"),
        S = s("DNgp"),
        v = s("MeYt"),
        f = s("J9+s"),
        M = s("jVWm");
      class y extends c.a {
        constructor(...e) {
          super(...e),
            d()(this, "handleClick", (e) => {
              const t = S.default.state;
              if ("editing" === t.mode) {
                const e = Object(M.a)("InlineCommentButton", t.multiSelection);
                if (!e) return;
                const s = e.store;
                u.e({
                  environment: this.environment,
                  textStore: s,
                  blockStore: this.props.blockStore,
                  selection: e.selection,
                });
              }
              b.qe(this.environment, { action: "comment" });
            });
        }
        renderComponent() {
          const { device: e } = this.environment,
            t = e.isMobile;
          return r()(m.a, {
            renderTooltip: () =>
              r()(
                l.Fragment,
                {},
                void 0,
                r()(
                  "div",
                  {},
                  void 0,
                  r()(f.FormattedMessage, {
                    defaultMessage: "Comment on selected text",
                    id: "inlineCommentButton.tooltip",
                  })
                ),
                r()(
                  "div",
                  {},
                  void 0,
                  r()(g.a, {
                    style: { color: this.theme.mediumInvertedTextColor },
                    name: "comment",
                  })
                )
              ),
            render: (e) =>
              p.a.createElement(
                v.a,
                a()(
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      padding: "0 8px",
                      whiteSpace: "nowrap",
                      ...this.props.style,
                    },
                    disabled: this.props.disabled,
                    disabledFeedback: this.props.disabled,
                    onClick: this.handleClick,
                  },
                  e
                ),
                h.a.speechBubbleThin({
                  width: t ? 18 : 16,
                  height: t ? 18 : 16,
                  marginTop: t ? 0 : 1,
                  marginRight: 4,
                }),
                !t &&
                  r()(f.FormattedMessage, {
                    defaultMessage: "Comment",
                    id: "inlineCommentButton.commentLabel",
                  })
              ),
          });
        }
      }
      t.a = y;
    },
  },
]);
