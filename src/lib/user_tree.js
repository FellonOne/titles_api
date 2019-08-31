class UserTree {
  constructor(usersData, points, titleReq, pg, yearMonth) {
    this.users = new Map();
    this.pg = pg;
    this.yearMonth = yearMonth;
    this.baseBonus = titleReq.baseBonus;
    this.directorBonus = titleReq.directorBonus;
    this.levelBonus = titleReq.levelBonus;

    for (let i = 0; i < usersData.length; i += 1) {
      const uid = usersData[i].id;

      if (
        typeof this.users.get(uid) !== "undefined" &&
        this.users.get(uid) !== null
      ) {
        this.users.get(uid).self = usersData[i];
      } else {
        this.users.set(uid, {
          childrens: [],
          self: usersData[i],
          group_points: 0,
          structure_points: 0,
          personal_points: 0,
          accumulative_personal_points: 0,
          titles_id: 0,
          step_bonus: 0,
          level_bonus: 0,
          personal_bonus: 0,
          director_bonus: 0,
          count_tm: 0,
          count_rd: 0,
          salary: 0,
          active_group_points: [],
          blocks_group_points: []
        });
      }

      if (parseInt(usersData[i].parent_id, 10) !== 0) {
        if (
          typeof this.users.get(usersData[i].parent_id) !== "undefined" &&
          this.users.get(usersData[i].parent_id) !== null
        ) {
          this.users.get(usersData[i].parent_id).childrens.push(uid);
        } else {
          this.users.set(usersData[i].parent_id, {
            childrens: [uid],
            self: {},
            group_points: 0,
            structure_points: 0,
            personal_points: 0,
            accumulative_personal_points: 0,
            titles_id: 0,
            step_bonus: 0,
            level_bonus: 0,
            personal_bonus: 0,
            director_bonus: 0,
            count_tm: 0,
            count_rd: 0,
            salary: 0,
            active_group_points: [],
            blocks_group_points: []
          });
        }
      }

      if (typeof points[uid] !== "undefined" && points[uid] !== null) {
        this.users.get(uid).personal_points = parseFloat(
          points[uid].personal_points
        );
        this.users.get(uid).accumulative_personal_points = parseFloat(
          points[uid].accumulative_personal_points
        );
      } else this.users.get(uid).personal_points = 0;
      if (usersData[i].roles_id === 1) this.root = uid;
    }
    this.deleteID = [];
  }

  async init() {
    await this.calculate(this.users.get(this.root));
  }

  checkDirectorTitle(user, countTM, countRD, max = false) {
    let maxTitles = 9;
    for (let i = 0; i < this.directorBonus.length; i += 1) {
      if (
        user.structure_points >= this.directorBonus[i].need_structure_points &&
        user.group_points >= this.directorBonus[i].need_group_points &&
        ((countTM >= this.directorBonus[i].need_top_manager &&
          countRD >= this.directorBonus[i].need_regional_director) ||
          (countTM >= this.directorBonus[i].need_alternative_top_manager &&
            countRD >=
              this.directorBonus[i].need_alternative_regional_director)) &&
        !max
      ) {
        if (maxTitles < this.directorBonus[i].titles_id)
          maxTitles = this.directorBonus[i].titles_id;
      }

      if (
        user.structure_points >=
          this.directorBonus[i].need_final_structure_points &&
        user.group_points >= this.directorBonus[i].need_final_group_points &&
        ((countTM >= this.directorBonus[i].need_top_manager &&
          countRD >= this.directorBonus[i].need_regional_director) ||
          (countTM >= this.directorBonus[i].need_alternative_top_manager &&
            countRD >=
              this.directorBonus[i].need_alternative_regional_director)) &&
        max
      ) {
        if (maxTitles < this.directorBonus[i].titles_id)
          maxTitles = this.directorBonus[i].titles_id;
      }
    }
    return maxTitles;
  }

  deepTM(user) {
    const data = { countTM: 0, countRD: 0 };
    if (user.titles_id === 1) {
      user.childrens.forEach(i => {
        if (this.getUser(i) !== undefined) {
          const result = this.deepTM(this.getUser(i));
          data.countTM += result.countTM;
          data.countRD += result.countRD;
        }
      });
    } else {
      if (user.titles_id >= 9) data.countTM += 1;
      if (user.titles_id >= 14) data.countRD += 1;
    }
    return data;
  }

  async calculate(user) {
    const userDB = this.getUser(user.self.id);
    let groupPoints = parseFloat(user.personal_points);
    const accumulativePersonalPoints = parseFloat(
      user.accumulative_personal_points
    );
    const personalPoints = parseFloat(groupPoints);
    let countTM = 0;
    let countRD = 0;
    let stP = 0;

    for (let i = 0; i < user.childrens.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const gpFromChildren = await this.calculate(
        this.getUser(user.childrens[i])
      );
      groupPoints += gpFromChildren;

      if (
        this.getUser(user.childrens[i]) !== undefined &&
        this.getUser(user.childrens[i]).titles_id >= 9
      ) {
        countTM += 1;
        if (this.getUser(user.childrens[i]).titles_id >= 14) countRD += 1;
        stP += this.getUser(user.childrens[i]).structure_points;
      } else if (
        this.getUser(user.childrens[i]) !== undefined &&
        this.getUser(user.childrens[i]).personal_points >= 70
      ) {
        if (this.getUser(user.childrens[i]).group_points >= 4000) {
          stP += this.getUser(user.childrens[i]).group_points;
          const data = this.deepTM(this.getUser(user.childrens[i]));
          countTM += data.countTM;
          countRD += data.countRD;
        }
      } else if (
        this.getUser(user.childrens[i]) !== undefined &&
        this.getUser(user.childrens[i]).personal_points < 70
      ) {
        if (
          this.getUser(user.childrens[i]).titles_id === 1 &&
          this.getUser(user.childrens[i]).structure_points > 1
        ) {
          stP +=
            this.getUser(user.childrens[i]).structure_points -
            this.getUser(user.childrens[i]).group_points;
          const data = this.deepTM(this.getUser(user.childrens[i]));
          countTM += data.countTM;
          countRD += data.countRD;
        }
      }
    }

    userDB.group_points = groupPoints - stP;
    userDB.structure_points = groupPoints;
    userDB.count_tm = countTM;
    userDB.count_rd = countRD;

    if (groupPoints < 1e-2) {
      this.users.delete(user.self.id);
      return 0;
    }

    /*
     *   Titles Calculation
     */
    if (personalPoints >= 70) {
      let minTitles = 1;

      if (countTM > 0 || groupPoints >= 4000 || stP > 0) {
        minTitles = 9;
        const qualification = { state: false, prevOne: 0, prevSecond: 0 };
        /*
        if (userDB.self.qualification) {
          const res = await this.pg
            .table("marketing_plan_start_qualification")
            .select("*")
            .where("users_id", "=", userDB.self.id)
            .first();

          if (res.rows.length > 0) {
            qualification.start = res.rows[0].year_month_start;
            qualification.titles = res.rows[0].titles_id;
            qualification.goal = res.rows[0].goal;
            qualification.end = res.rows[0].year_month_end;
            qualification.state = true;

            userDB.qualification = qualification;
          }
        }*/
        const maxHistoryTitles = await this.pg
          .table("users_states_histories")
          .where("users_id", "=", userDB.self.id)
          .max("users_titles_id")
          .first();

        const previousTitles = await this.pg
          .table("users_states_histories")
          .where("users_id", "=", userDB.self.id)
          .where("year_month", ">=", this.yearMonth.previous(3));

        const countMaxTitles = await this.pg
          .table("users_states_histories")
          .where("users_id", "=", userDB.self.id)
          .where("users_titles_id", "=", maxHistoryTitles.max)
          .count()
          .first();
        for (let i = 0; i < previousTitles.length; i += 1) {
          if (
            parseInt(previousTitles[i].year_month, 10) ===
            parseInt(this.yearMonth.previous(1), 10)
          )
            qualification.prevOne = parseInt(
              previousTitles[i].users_titles_id,
              10
            );

          if (
            parseInt(previousTitles[i].year_month, 10) ===
            parseInt(this.yearMonth.previous(2), 10)
          )
            qualification.prevSecond = parseInt(
              previousTitles[i].users_titles_id,
              10
            );
        }
        let titleD = this.checkDirectorTitle(userDB, countTM, countRD, false);

        if (
          titleD < maxHistoryTitles ||
          (countMaxTitles.count >= 2 &&
            titleD === parseInt(maxHistoryTitles.max, 10))
        ) {
          titleD = this.checkDirectorTitle(userDB, countTM, countRD, true);
        } else if (
          (parseInt(countMaxTitles.count, 10) === 1 &&
            titleD === parseInt(maxHistoryTitles.max, 10) &&
            qualification.prevOne === titleD) ||
          maxHistoryTitles.max < titleD
        ) {
          if (maxHistoryTitles.max < titleD && countMaxTitles.count >= 3) {
            titleD = this.checkDirectorTitle(userDB, countTM, countRD, false);
          } else if (
            maxHistoryTitles.max < titleD &&
            countMaxTitles.count < 3 &&
            qualification.prevOne !== 0 &&
            qualification.prevOne === parseInt(maxHistoryTitles.max, 10)
          ) {
            titleD = maxHistoryTitles.max;
          } else {
            titleD = this.checkDirectorTitle(userDB, countTM, countRD, false);
          }
        } else titleD = this.checkDirectorTitle(userDB, countTM, countRD, true);

        minTitles = titleD;
      } else {
        for (let i = 0; i < this.baseBonus.length; i += 1) {
          if (
            personalPoints >= this.baseBonus[i].min_personal_points &&
            userDB.group_points >= this.baseBonus[i].need_base_group_points &&
            (personalPoints >= this.baseBonus[i].need_base_personal_points ||
              accumulativePersonalPoints >=
                this.baseBonus[i].need_base_personal_points)
          ) {
            if (minTitles < this.baseBonus[i].titles_id)
              minTitles = this.baseBonus[i].titles_id;
          }
          if (
            personalPoints >= this.baseBonus[i].min_personal_points &&
            this.baseBonus[i].has_alternative &&
            userDB.group_points >=
              this.baseBonus[i].need_alternative_group_points &&
            personalPoints >= this.baseBonus[i].need_alternative_personal_points
          ) {
            if (minTitles < this.baseBonus[i].titles_id)
              minTitles = this.baseBonus[i].titles_id;
          }
        }
      }

      userDB.titles_id = minTitles;
    } else {
      userDB.titles_id = 1;
    }

    /*
     *   Active Group Points
     */
    for (let i = 0; i < user.childrens.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      if (
        this.getUser(user.childrens[i]) !== undefined &&
        this.getUser(user.childrens[i]).titles_id < 9 &&
        this.getUser(user.childrens[i]).group_points < 4000
      ) {
        const children = this.getUser(user.childrens[i]);
        let sumBlock = 0;
        children.blocks_group_points.forEach(gp => {
          sumBlock += gp.group_points;
        });
        if (userDB.titles_id === 1) {
          children.blocks_group_points.forEach(gp =>
            userDB.blocks_group_points.push(gp)
          );
          if (children.titles_id === 1) {
            children.active_group_points.forEach(gp =>
              userDB.active_group_points.push(gp)
            );
          } else {
            userDB.active_group_points.push({
              group_points: children.group_points - sumBlock,
              titles_id: children.titles_id,
              user_id: children.self.id
            });
          }
        } else {
          if (
            children.titles_id === 1 &&
            Math.abs(children.group_points - children.personal_points) < 1
          ) {
            userDB.active_group_points.push({
              group_points: children.personal_points,
              titles_id: 1,
              user_id: children.self.id
            });
          }
          if (userDB.titles_id > children.titles_id) {
            let realSumBlock = 0;
            children.blocks_group_points.forEach(gp => {
              realSumBlock += gp.group_points;
              if (userDB.titles_id <= gp.titles_id)
                userDB.blocks_group_points.push(gp);
              else userDB.active_group_points.push(gp);
            });

            if (children.titles_id === 1) {
              children.active_group_points.forEach(gp => {
                if (gp.titles_id < userDB.titles_id)
                  userDB.active_group_points.push(gp);
                else userDB.blocks_group_points.push(gp);
              });
            } else {
              userDB.active_group_points.push({
                titles_id: children.titles_id,
                group_points:
                  children.group_points - realSumBlock > 0
                    ? children.group_points - realSumBlock
                    : 0,
                user_id: children.self.id
              });
            }
          } else {
            let realSumBlock = 0;
            children.blocks_group_points.forEach(gp => {
              if (gp.titles_id >= userDB.titles_id) {
                realSumBlock += gp.group_points;
                userDB.blocks_group_points.push(gp);
              }
            });

            userDB.blocks_group_points.push({
              titles_id: children.titles_id,
              group_points:
                children.group_points - realSumBlock > 0
                  ? children.group_points - realSumBlock
                  : 0,
              user_id: children.self.id
            });
          }
        }
      }
    }

    /*
     *   Salary Calculation
     */
    if (personalPoints >= 70 && userDB.titles_id >= 2) {
      const ut = userDB.titles_id >= 9 ? 7 : userDB.titles_id - 2;

      userDB.personal_bonus =
        (personalPoints / 100) * this.baseBonus[ut].step_percent;

      userDB.level_bonus =
        (this.getPointByLevel(userDB, 1) *
          this.baseBonus[ut].first_level_percent) /
        100;
      userDB.level_bonus +=
        (this.getPointByLevel(userDB, 2) *
          this.baseBonus[ut].second_level_percent) /
        100;
      userDB.level_bonus +=
        (this.getPointByLevel(userDB, 3) *
          this.baseBonus[ut].third_level_percent) /
        100;

      userDB.active_group_points.forEach(points => {
        if (points.titles_id > 0) {
          if (points.titles_id - 2 >= 0)
            userDB.step_bonus +=
              (points.group_points *
                (this.baseBonus[ut].step_percent -
                  this.baseBonus[points.titles_id - 2].step_percent)) /
              100;
          else
            userDB.step_bonus +=
              (points.group_points * this.baseBonus[ut].step_percent) / 100;
        }
      });

      if (userDB.titles_id >= 10) {
        const salaryBonus = new Map();
        this.levelBonus.forEach(level => {
          if (parseInt(level.titles_id, 10) + 9 === userDB.titles_id) {
            salaryBonus.set(
              level.level,
              this.salaryBonus(userDB, level.level, level.percent)
            );
          }
        });
        let directorSalaryBonus = 0;
        salaryBonus.forEach(val => {
          directorSalaryBonus += val;
        });
        userDB.director_bonus = directorSalaryBonus;
        userDB.salary =
          (parseFloat(userDB.personal_bonus) +
            parseFloat(userDB.level_bonus) +
            parseFloat(userDB.step_bonus)) *
            4000 +
          directorSalaryBonus;
      } else {
        userDB.salary =
          (parseFloat(userDB.personal_bonus) +
            parseFloat(userDB.level_bonus) +
            parseFloat(userDB.step_bonus)) *
          4000;
      }
    }

    if (userDB.titles_id === 1) {
      if (userDB.group_points < 1 && userDB.structure_points > 1)
        userDB.group_points = userDB.structure_points;
    }

    return groupPoints;
  }

  salaryBonus(user, lvl, percent, personallyInvited = true) {
    if (lvl === 0)
      return personallyInvited
        ? (user.salary * percent) / 100
        : (user.salary * (percent / 2)) / 100;
    let salary = 0;

    user.childrens.forEach(id => {
      if (
        typeof this.users.get(id) !== "undefined" &&
        this.users.get(id) !== null
      ) {
        if (this.getUser(id).salary < 1)
          salary += this.salaryBonus(this.getUser(id), lvl, percent, false);
        else
          salary += this.salaryBonus(
            this.getUser(id),
            lvl - 1,
            percent,
            personallyInvited
          );
      }
    });

    return salary;
  }

  getPointByLevel(user, lvl) {
    if (lvl === 0) return user.personal_points;
    let personalPoints = 0;

    user.childrens.forEach(id => {
      if (
        typeof this.users.get(id) !== "undefined" &&
        this.users.get(id) !== null
      ) {
        if (this.getUser(id).personal_points < 1)
          personalPoints += this.getPointByLevel(this.getUser(id), lvl);
        else personalPoints += this.getPointByLevel(this.getUser(id), lvl - 1);
      }
    });

    return personalPoints;
  }

  getUser(id) {
    return this.users.get(id);
  }
}

module.exports = UserTree;
